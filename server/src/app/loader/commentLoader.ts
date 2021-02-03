import DataLoader from 'dataloader'
import { getConnection, In } from 'typeorm'
import Comment from '../../database/entity/Comment'
import groupBy from '../util/groupBy'

export type CommentLoader = {
	byPostIds: ReturnType<typeof byPostIds>
	byUserIds: ReturnType<typeof byUserIds>
}

const byPostIds = () =>
	new DataLoader<string, Comment>(async (postIds) => {
		const comments: Comment[] = await getConnection()
			.getRepository(Comment)
			.find({ postId: In(postIds as string[]) })

		console.log('--------- COMMENTS ----------\n\n', comments)

		const grouped = groupBy(comments, 'postId')
		return postIds.map((id) => grouped[id])
	})

const byUserIds = () =>
	new DataLoader<string, Comment>(async (userIds) => {
		const comments: Comment[] = await getConnection()
			.getRepository(Comment)
			.find({ postId: In(userIds as string[]) })

		const grouped = groupBy(comments, 'postId')
		return userIds.map((id) => grouped[id])
	})

const commentLoader: CommentLoader = {
	byPostIds: byPostIds(),
	byUserIds: byUserIds()
}

export default commentLoader
