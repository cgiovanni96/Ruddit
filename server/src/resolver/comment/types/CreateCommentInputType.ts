import { InputType, Field } from 'type-graphql'

@InputType()
export default class CreateCommentInputType {
	@Field({ nullable: false })
	postId: string

	@Field({ nullable: false })
	text: string
}
