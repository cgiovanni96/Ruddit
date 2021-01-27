import { ArgsType, Field, Int } from 'type-graphql'

@ArgsType()
export default class SubrudditPaginationArguments {
	@Field(() => Int)
	limit: number

	@Field(() => String, { nullable: true })
	cursor: string | null
}
