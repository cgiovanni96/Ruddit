import DataLoader from 'dataloader'
import Vote from '../../database/entity/Vote'

type voteStatusValues = {
	postId: string
	userId: string
}

const voteLoader = () =>
	new DataLoader<voteStatusValues, Vote | null>(async (keys) => {
		const votes = await Vote.findByIds(keys as voteStatusValues[])
		const votesArray: Record<string, Vote> = {}
		votes.forEach((vote) => {
			const id = `${vote.userId}|${vote.postId}`
			votesArray[id] = vote
		})

		return keys.map((key) => votesArray[`${key.userId}|${key.postId}`])
	})

export default voteLoader
