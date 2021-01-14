import { Field, InputType } from 'type-graphql'

@InputType()
export default class UpdatePostInputType {
	@Field({ nullable: true })
	title?: string

	@Field({ nullable: true })
	text?: string
}
