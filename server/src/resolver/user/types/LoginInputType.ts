import { Field, InputType } from 'type-graphql'

@InputType()
export default class LoginInputType {
	@Field({ nullable: true })
	name!: string

	@Field({ nullable: true })
	email!: string

	@Field()
	password: string
}
