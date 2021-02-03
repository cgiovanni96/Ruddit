import { ArgsType, Field } from 'type-graphql'

@ArgsType()
export default class EditCommentArguments {
	@Field(() => String)
	id: string

	@Field(() => String)
	subrudditId: string
}
