import { Field, InputType } from 'type-graphql'

const rAllId = '407f980e-db50-4354-9c30-03dbf96c3da4'

@InputType()
export default class CreatePostInputType {
	@Field({ nullable: false })
	title: string

	@Field({ nullable: false })
	text: string

	@Field({ nullable: true, defaultValue: rAllId })
	subrudditId: string
}
