import { ObjectType, Field } from 'type-graphql'
import Post from '../../entity/Post'

@ObjectType()
class PaginatedPostsResponse {
	@Field(() => [Post])
	posts: Post[]
	@Field()
	hasMore: boolean
}

export default PaginatedPostsResponse
