import User from '../../database/entity/User'
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import UserInputType from './types/UserInputType'
import UserResponse from '../../database/schema/response/UserResponse'
import argon2 from 'argon2'
import Context from 'src/app/server/context'
import {
	IncorrectPasswordError,
	NoUsernameError,
	PasswordLengthError,
	UserAlreadyExistsError
} from './errors'

@Resolver()
export default class AuthResolver {
	@Query(() => UserResponse, { nullable: true })
	async me(@Ctx() { req }: Context): Promise<UserResponse> {
		console.log('Session: ', req.session)
		if (!req.session.userId)
			return {
				errors: [{ field: 'user', message: 'You are currently not logged in' }]
			}
		const user = await User.findOne({ id: req.session.userId })
		console.log(user)
		return {
			user
		}
	}

	@Mutation(() => UserResponse)
	async register(
		@Arg('data') registerUserData: UserInputType,
		@Ctx() { req }: Context
	): Promise<UserResponse> {
		let userRes
		try {
			const { name, password } = registerUserData
			if (password.length <= 2) return PasswordLengthError
			const user = await User.create({ name, password })
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
		@Arg('data') loginUserData: UserInputType,
		@Ctx() { req }: Context
	): Promise<UserResponse> {
		const { name, password } = loginUserData
		const user = await User.findOne({ where: { name } })
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
}
