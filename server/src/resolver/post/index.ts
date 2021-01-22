import {
	Arg,
	Args,
	Authorized,
	Ctx,
	FieldResolver,
	Int,
	Mutation,
	Query,
	Resolver,
	Root,
	UseMiddleware
} from 'type-graphql'
import { getConnection } from 'typeorm'
import Context from '../../app/server/context'
import Post from '../../database/entity/Post'
import Subruddit from '../../database/entity/Subruddit'
import User from '../../database/entity/User'
import PaginatedPostsResponse from '../../database/schema/response/PaginatedPostsResponse'
import isAuthorOrAdmin from '../../middleware/isAuthorOrAdmin'
import CreatePostInputType from './types/CreatePostInputType'
import PaginationArgumentsType from './types/PaginationArgumentsType'
import UpdatePostInputType from './types/UpdatePostInputType'

@Resolver(Post)
export default class PostResolver {
	@FieldResolver(() => User)
	author(@Root() post: Post, @Ctx() { loaders }: Context) {
		return loaders.userLoader.load(post.authorId)
	}

	@FieldResolver(() => Subruddit)
	subruddit(@Root() post: Post, @Ctx() { loaders }: Context) {
		return loaders.subrudditLoader.load(post.subrudditId)
	}

	@FieldResolver(() => Int, { nullable: true })
	async voteStatus(@Root() post: Post, @Ctx() { loaders, req }: Context) {
		if (!req.session.userId) return null
		const vote = await loaders.voteLoader.load({
			postId: post.id,
			userId: req.session.userId
		})
		return vote ? vote.value : null
	}

	@Query(() => PaginatedPostsResponse)
	async posts(
		@Args() { limit, cursor, subrudditId }: PaginationArgumentsType
	): Promise<PaginatedPostsResponse> {
		const setLimit = Math.min(50, limit)
		const limitPlusOne = limit + 1

		const cursorDate = cursor ? new Date(parseInt(cursor)) : null

		const qb = await getConnection().getRepository(Post).createQueryBuilder('p')
		let flag = false

		if (subrudditId) {
			flag = true
			qb.where('p.subrudditId = :subrudditId', { subrudditId })
		}

		if (cursor) {
			if (flag) qb.andWhere('p.createdAt = :cursorDate', { cursorDate })
			else qb.where('p.createdAt = :cursorDate', { cursorDate })
		}

		qb.orderBy('p.createdAt', 'DESC')
		qb.limit(limitPlusOne)
		const posts = await qb.getMany()

		console.log('POST: ', posts)

		const res = {
			posts: posts.slice(0, setLimit),
			hasMore: posts.length === limitPlusOne
		}

		return res
	}

	@Query(() => [Post])
	async easyPosts(): Promise<Post[]> {
		return Post.find()
	}

	@Query(() => Post, { nullable: true })
	async post(@Arg('id', () => String) id: string): Promise<Post | undefined> {
		return Post.findOne(id)
	}

	@Authorized()
	@Mutation(() => Post, { nullable: true })
	async createPost(
		@Arg('data') createPostData: CreatePostInputType,
		@Ctx() { req }: Context
	): Promise<Post | null> {
		const post = await Post.create({
			...createPostData,
			authorId: req.session.userId
		})
		if (!post) return null
		return post.save()
	}

	@Authorized()
	@UseMiddleware(isAuthorOrAdmin)
	@Mutation(() => Post, { nullable: true })
	async updatePost(
		@Arg('id') id: string,
		@Arg('data') updatePostData: UpdatePostInputType
	): Promise<Post | undefined> {
		const { raw } = await getConnection()
			.createQueryBuilder()
			.update(Post)
			.set({ ...updatePostData })
			.where('id = :id', {
				id
			})
			.returning('*')
			.execute()
		return raw[0]
	}

	@Mutation(() => Boolean)
	@UseMiddleware(isAuthorOrAdmin)
	async deletePost(@Arg('id') id: string): Promise<boolean> {
		try {
			await Post.delete({ id })
			return true
		} catch {
			return false
		}
	}
}
