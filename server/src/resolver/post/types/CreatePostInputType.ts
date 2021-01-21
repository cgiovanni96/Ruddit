import { Field, InputType } from 'type-graphql'

@InputType()
export default class CreatePostInputType {
	@Field({ nullable: false })
	title: string

	@Field({ nullable: false })
	text: string

	@Field({ nullable: false })
	subrudditId: string
}
