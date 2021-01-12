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
// import userId from '../../database/userId'
import CreatePostInputType from './types/CreatePostInputType'
import PaginationArgumentsType from './types/PaginationArgumentsType'

@Resolver()
export default class PostResolver {
	@Query(() => [Post])
	async posts(
		@Args() { limit, cursor }: PaginationArgumentsType
	): Promise<Post[]> {
		const setLimit = Math.min(50, limit)
		const limitPlusOne = setLimit + 1

		// const queryBuilder = getConnection()
		// 	.getRepository(Post)
		// 	.createQueryBuilder('p')
		// 	.where('user.id = :id', { id: userId })
		// 	.orderBy('"createdAt"', 'DESC')
		// 	.take(setLimit)

		// if (cursor)
		// 	queryBuilder.where('"createAt" < :cursor', {
		// 		cursor: new Date(parseInt(cursor))
		// 	})

		const qb = getConnection()
			.getRepository(Post)
			.createQueryBuilder('p')
			.orderBy('p."createdAt"', 'DESC')
			.take(limitPlusOne)
		// .innerJoinAndSelect('p.author', 'u', 'u.id = p."authorId"')

		if (cursor) {
			qb.where('p."createdAt" < :cursor', {
				cursor: new Date(parseInt(cursor))
			})
		}

		const posts = await qb.getMany()
		console.log('posts: ', posts)
		return posts
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
