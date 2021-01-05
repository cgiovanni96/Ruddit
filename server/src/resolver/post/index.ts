import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import Post from '../../database/entity/Post'
import CreatePostInputType from './types/CreatePostInputType'

@Resolver()
export default class PostResolver {
	@Query(() => [Post])
	async posts(): Promise<Post[]> {
		return Post.find()
	}

	@Query(() => Post, { nullable: true })
	async post(@Arg('id', () => String) id: string): Promise<Post | undefined> {
		return Post.findOne(id)
	}

	@Mutation(() => Post, { nullable: true })
	async createPost(
		@Arg('data') createPostData: CreatePostInputType
	): Promise<Post | null> {
		const post = await Post.create({ ...createPostData })
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
