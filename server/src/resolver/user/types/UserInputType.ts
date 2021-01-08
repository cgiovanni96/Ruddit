import { Field, InputType } from 'type-graphql'

@InputType()
export default class UserInputType {
	@Field()
	name: string

	@Field()
	email: string

	@Field()
	password: string
}
