import { Field, InputType } from 'type-graphql'

@InputType()
export default class UserInputType {
	@Field()
	name: string

	@Field()
	password: string
}
