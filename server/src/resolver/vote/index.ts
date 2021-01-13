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
		const { userId } = req.session
		const vote = await Vote.findOne({ where: { userId, postId } })

		const isPositive = value !== -1
		const escapedValue = isPositive ? 1 : -1

		// if voted a second time, I need to do (2 * value),
		// -1 => 1, or 1 => -1
		let factoredValue: number

		// first time voting
		if (!vote) {
			factoredValue = escapedValue
			await Vote.insert({
				userId,
				postId,
				value: factoredValue
			})
		}

		// changing the vote (upvote => downvote || downvote => upvote)
		if (vote && vote.value !== escapedValue) {
			factoredValue = 2 * escapedValue
			await Vote.update(
				{
					userId,
					postId
				},
				{ value: factoredValue }
			)
		}

		// same vote, no need to perform the query
		if (vote && vote.value === escapedValue) return false

		await getConnection()
			.createQueryBuilder()
			.update(Post)
			.where('id = :id', { id: postId })
			.set({ points: () => `points + ${factoredValue}` })
			.execute()

		return true
	}
}
