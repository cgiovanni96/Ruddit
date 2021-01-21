import { Field, InputType } from 'type-graphql'

@InputType()
export default class CreateSubrudditInputType {
	@Field({ nullable: false })
	name: string

	@Field({ nullable: false })
	description: string

	@Field({ nullable: false })
	slug: string
}
