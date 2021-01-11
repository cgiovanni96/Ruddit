import {
	Arg,
	Args,
	Authorized,
	Ctx,
	Mutation,
	Query,
	Resolver
} from 'type-graphql'
import { getConnection } from 'typeorm'
import Context from '../../app/server/context'
import Post from '../../database/entity/Post'
import CreatePostInputType from './types/CreatePostInputType'
import PaginationArgumentsType from './types/PaginationArgumentsType'

@Resolver()
export default class PostResolver {
	@Query(() => [Post])
	async posts(
		@Args() { limit, cursor }: PaginationArgumentsType
	): Promise<Post[]> {
		const setLimit = Math.min(50, limit)

		const queryBuilder = getConnection()
			.getRepository(Post)
			.createQueryBuilder('p')
			.where('user.id = :id', { id: '34cfbf79-f57e-45db-ac9d-cc193cc6249d' })
			.orderBy('"createdAt"', 'DESC')
			.take(setLimit)

		if (cursor)
			queryBuilder.where('"createAt" < :cursor', {
				cursor: new Date(parseInt(cursor))
			})
		return queryBuilder.getMany()
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

	@Mutation(() => Boolean, { nullable: true })
	async updatePost(
		@Arg('id') id: string,
		@Arg('data') createPostData: CreatePostInputType
	): Promise<boolean> {
		try {
			await Post.update(id, { ...createPostData })
			return true
		} catch {
			return false
		}
	}

	@Mutation(() => Boolean)
	async deletePost(@Arg('id') id: string): Promise<boolean> {
		try {
			await Post.delete(id)
			return true
		} catch {
			return false
		}
	}
}
