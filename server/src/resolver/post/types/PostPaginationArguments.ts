import { ArgsType, Field, Int } from 'type-graphql'

@ArgsType()
export default class PostPaginationArguments {
	@Field(() => Int)
	limit: number

	@Field(() => String, { nullable: true })
	cursor: string | null

	@Field(() => String, { nullable: true })
	subrudditId: string | null
}
