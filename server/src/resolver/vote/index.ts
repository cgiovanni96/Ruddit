import { Arg, Authorized, Ctx, Int, Mutation, Resolver } from 'type-graphql'
import { getConnection } from 'typeorm'
import Context from '../../app/server/context'
import Post from '../../database/entity/Post'
import Vote from '../../database/entity/Vote'

@Resolver()
export default class VoteResolver {
	@Authorized()
	@Mutation(() => Boolean)
	async vote(
		@Arg('postId') postId: string,
		@Arg('value', () => Int) value: number,
		@Ctx() { req }: Context
	): Promise<boolean> {
		const isPositive = value !== -1
		const escapedValue = isPositive ? 1 : -1
		const { userId } = req.session

		await Vote.insert({
			userId,
			postId,
			value: escapedValue
		})

		await getConnection()
			.createQueryBuilder()
			.update(Post)
			.set({ votes: () => `votes + ${escapedValue}` })
			.execute()

		return true
	}
}
