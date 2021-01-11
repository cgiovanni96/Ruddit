import { Field, InputType } from 'type-graphql'

@InputType()
export default class ChangePasswordInputType {
	@Field()
	token: string

	@Field()
	password: string
}
