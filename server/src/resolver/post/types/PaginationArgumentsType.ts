import { ArgsType, Field, Int } from 'type-graphql'

@ArgsType()
export default class PaginationArgumentsType {
	@Field(() => Int)
	limit: number

	@Field(() => String, { nullable: true })
	cursor: string | null
}
