import User from '../../database/entity/User'
import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import UserInputType from './types/UserInputType'
import UserResponse from '../../database/schema/response/UserResponse'
import argon2 from 'argon2'

@Resolver()
export default class AuthResolver {
	@Mutation(() => UserResponse)
	async register(
		@Arg('data') registerUserData: UserInputType
	): Promise<UserResponse> {
		let userRes
		try {
			const { name, password } = registerUserData
			const user = await User.create({ name, password })
			userRes = await user.save()
		} catch (e) {
			console.log(e.code)

			if (e.code === '23505') {
				console.log('Hello')
				return {
					errors: [
						{
							field: 'name',
							message: 'A user with that name already exists'
						}
					]
				}
			}
		}

		console.log('why')
		return { user: userRes }
	}

	@Query(() => UserResponse)
	async login(
		@Arg('data') loginUserData: UserInputType
	): Promise<UserResponse> {
		const { name, password } = loginUserData
		const user = await User.findOne({ where: { name } })

		if (!user) {
			return {
				errors: [
					{
						field: 'username',
						message: "Username doesn't exist"
					}
				]
			}
		}

		const valid = await argon2.verify(user.password, password)
		if (!valid) {
			return {
				errors: [
					{
						field: 'password',
						message: 'Incorrect Password'
					}
				]
			}
		}

		return {
			user
		}
	}
}
