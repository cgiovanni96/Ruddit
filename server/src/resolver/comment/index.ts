import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import Context from '../../app/server/context'
import Comment from '../../database/entity/Comment'
import CreateCommentInputType from './types/CreateCommentInputType'

@Resolver()
export default class CommentResolver {
	@Query(() => [Comment])
	async easyComments(): Promise<Comment[]> {
		return Comment.find()
	}

	@Mutation(() => Comment, { nullable: true })
	@Authorized()
	async createComment(
		@Arg('data') { postId, text }: CreateCommentInputType,
		@Ctx() { req }: Context
	): Promise<Comment | null> {
		const comment = await Comment.create({
			text,
			postId,
			userId: req.session.userId
		})

		return comment.save()
	}
}
