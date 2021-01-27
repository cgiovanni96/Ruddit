import { ObjectType, Field } from 'type-graphql'
import Subruddit from '../../entity/Subruddit'

@ObjectType()
class PaginatedSubrudditsResponse {
	@Field(() => [Subruddit])
	subruddits: Subruddit[]
	@Field()
	hasMore: boolean
}

export default PaginatedSubrudditsResponse
