import {
	Arg,
	Args,
	Authorized,
	Ctx,
	Mutation,
	Query,
	Resolver,
	UseMiddleware
} from 'type-graphql'
import { getConnection } from 'typeorm'
import Context from '../../app/server/context'
import Comment from '../../database/entity/Comment'
import Post from '../../database/entity/Post'
import isCommentAuthorOrAdmin from '../../middleware/isCommentAuthorOrAdmin'
import CreateCommentInputType from './types/CreateCommentInputType'
import EditCommentArguments from './types/EditCommentArguments'

@Resolver()
export default class CommentResolver {
	@Query(() => [Comment])
	async easyComments(): Promise<Comment[]> {
		return Comment.find({ order: { createdAt: 'DESC' } })
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

	@Authorized()
	@UseMiddleware(isCommentAuthorOrAdmin)
	@Mutation(() => Post, { nullable: true })
	async updateComment(
		@Args() deleteCommentArguments: EditCommentArguments,
		@Arg('text') text: string
	): Promise<Post | undefined> {
		const { raw } = await getConnection()
			.createQueryBuilder()
			.update(Comment)
			.set({ text })
			.where('id  :id', {
				id: deleteCommentArguments.id
			})
			.returning('*')
			.execute()
		return raw[0]
	}

	@Authorized()
	@UseMiddleware(isCommentAuthorOrAdmin)
	@Mutation(() => Boolean)
	async deleteComment(
		@Args() deleteCommentArguments: EditCommentArguments
	): Promise<boolean> {
		try {
			await Comment.delete({ id: deleteCommentArguments.id })
			return true
		} catch {
			return false
		}
	}
}
