import argon2 from 'argon2'
import { isEmail } from 'class-validator'
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'
import { v4 } from 'uuid'
import Context from '../../app/server/context'
import { sendEmail } from '../../app/util/email'
import User from '../../database/entity/User'
import UserResponse from '../../database/schema/response/UserResponse'
import {
	NoUsernameError,
	PasswordLengthError,
	TokenExpiredError
} from './errors'

export const FORGOT_PWD_PREFIX = 'forgot-password:'

@Resolver()
export default class ForgotPasswordResolver {
	@Mutation(() => Boolean)
	async forgotPassword(
		@Arg('email') email: string,
		@Ctx() { redis }: Context
	): Promise<boolean> {
		if (!isEmail(email)) return true
		const user = await User.findOne({ email })
		if (!user) {
			return true
		}

		const token = v4()

		const forgotPasswordHtml = `<a href="http://localhost:3000/change-password/${token}">Reset Password</a>`

		redis.set(FORGOT_PWD_PREFIX + token, user.id, 'ex', 1000 * 60 * 60 * 12) // 12 hours

		sendEmail(user.email, 'Password Reset', forgotPasswordHtml)
		return true
	}

	@Mutation(() => UserResponse, { nullable: true })
	async changePassword(
		@Arg('token') token: string,
		@Arg('newPassword') newPassword: string,
		@Ctx() { req, redis }: Context
	): Promise<UserResponse | null> {
		const redisKey = FORGOT_PWD_PREFIX + token
		console.log('newPassword: ', newPassword)
		if (newPassword.length <= 2) return PasswordLengthError
		const userId = await redis.get(redisKey)

		if (!userId) return TokenExpiredError

		const user = await User.findOne({ id: userId })
		if (!user) return NoUsernameError

		user.password = await argon2.hash(newPassword)
		req.session.userId = user.id
		await redis.del(redisKey)
		const userRet = await user.save()
		return { user: userRet }
	}
}
