import { Query, Resolver } from 'type-graphql'
import Comment from '../../database/entity/Comment'

@Resolver()
export default class CommentResolver {
	@Query(() => [Comment])
	async easyComments(): Promise<Comment[]> {
		return Comment.find()
	}
}
