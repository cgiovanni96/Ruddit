import User from '../../database/entity/User'
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import UserInputType from './types/UserInputType'
import UserResponse from '../../database/schema/response/UserResponse'
import argon2 from 'argon2'
import Context from 'src/app/server/context'
import {
	EmailNotValidError,
	IncorrectPasswordError,
	NoUsernameError,
	PasswordLengthError,
	UserAlreadyExistsError
} from './errors'
import { isEmail } from 'class-validator'
import LoginInputType from './types/LoginInputType'

@Resolver()
export default class AuthResolver {
	@Query(() => User, { nullable: true })
	async me(@Ctx() { req }: Context): Promise<User | null> {
		console.log('Session: ', req.session)
		if (!req.session.userId) return null
		const user = await User.findOne({ id: req.session.userId })
		if (!user) return null
		return user
	}

	@Mutation(() => UserResponse)
	async register(
		@Arg('data') registerUserData: UserInputType,
		@Ctx() { req }: Context
	): Promise<UserResponse> {
		let userRes
		try {
			const { name, password, email } = registerUserData
			if (password.length <= 2) return PasswordLengthError
			if (!isEmail(email)) return EmailNotValidError
			const user = await User.create({ name, password, email })
			userRes = await user.save()
		} catch (e) {
			if (e.code === '23505') {
				return UserAlreadyExistsError
			}
		}

		req.session.userId = userRes?.id
		return { user: userRes }
	}

	@Mutation(() => UserResponse)
	async login(
		@Arg('data') loginUserData: LoginInputType,
		@Ctx() { req }: Context
	): Promise<UserResponse> {
		const { name, password, email } = loginUserData

		if (email && !isEmail(email)) return EmailNotValidError

		const user = await User.findOne(name ? { name } : { email })
		console.log('User: ', user)
		if (!user) {
			return NoUsernameError
		}

		const valid = await argon2.verify(user.password, password)
		if (!valid) {
			return IncorrectPasswordError
		}

		req.session!.userId = user?.id
		return {
			user
		}
	}

	@Mutation(() => Boolean)
	async logout(@Ctx() { req, res }: Context): Promise<boolean> {
		return new Promise((resolve) =>
			req.session.destroy((err) => {
				if (err) {
					console.error(err)
					resolve(false)
					return
				}
				res.clearCookie('sid')
				resolve(true)
			})
		)
	}

	// @Mutation(Boolean)
	// async forgotPassword(@Ctx() { req }: Context): Promise<boolean> {
	// 	const user = await User.findOne({ id: req.session.userId })
	// }
}
