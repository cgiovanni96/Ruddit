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
	Root
} from 'type-graphql'
import { getConnection } from 'typeorm'
import Context from '../../app/server/context'
import Post from '../../database/entity/Post'
import Subruddit from '../../database/entity/Subruddit'
import User from '../../database/entity/User'
import PaginatedPostsResponse from '../../database/schema/response/PaginatedPostsResponse'
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
		@Args() { limit, cursor }: PaginationArgumentsType
	): Promise<PaginatedPostsResponse> {
		const setLimit = Math.min(50, limit)
		const limitPlusOne = limit + 1

		const replacements: any[] = [limitPlusOne]

		if (cursor) replacements.push(new Date(parseInt(cursor)))

		const posts = await getConnection().query(
			`
				select p.*
				from post p
				${cursor ? `where p."createdAt" < $2` : ''}
				order by p."createdAt" DESC
				limit $1
			`,
			replacements
		)

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
	@Mutation(() => Post, { nullable: true })
	async updatePost(
		@Arg('id') id: string,
		@Arg('data') updatePostData: UpdatePostInputType,
		@Ctx() { req }: Context
	): Promise<Post | undefined> {
		const postToUpdate = await Post.findOne(id, { relations: ['subruddit'] })
		if (!postToUpdate) return undefined
		const isAdmin =
			postToUpdate.subruddit.adminId === req.session.userId ? true : false
		const isAuthor = postToUpdate.authorId === req.session.userId ? true : false

		if (isAdmin || isAuthor) {
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
		} else {
			return undefined
		}
	}

	@Mutation(() => Boolean)
	async deletePost(
		@Arg('id') id: string,
		@Ctx() { req }: Context
	): Promise<boolean> {
		try {
			await Post.delete({ id, authorId: req.session.userId })
			return true
		} catch {
			return false
		}
	}
}
