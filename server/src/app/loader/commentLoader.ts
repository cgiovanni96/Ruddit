import DataLoader from 'dataloader'
import { getConnection, In } from 'typeorm'
import Comment from '../../database/entity/Comment'

export type CommentLoader = {
	byPostIds: ReturnType<typeof byPostIds>
	byUserIds: ReturnType<typeof byUserIds>
}

const byPostIds = () =>
	new DataLoader<string, Comment>(async (postIds) => {
		const comments: Comment[] = await getConnection()
			.getRepository(Comment)
			.find({ postId: In(postIds as string[]) })
		const commentsArray: Record<string, Comment> = {}
		comments.forEach((c) => {
			commentsArray[c.postId] = c
		})

		return postIds.map((id) => commentsArray[id])
	})

const byUserIds = () =>
	new DataLoader<string, Comment>(async (userIds) => {
		const comments: Comment[] = await getConnection()
			.getRepository(Comment)
			.find({ userId: In(userIds as string[]) })
		const commentsArray: Record<string, Comment> = {}
		comments.forEach((c) => {
			commentsArray[c.postId] = c
		})

		return userIds.map((id) => commentsArray[id])
	})

const commentLoader: CommentLoader = {
	byPostIds: byPostIds(),
	byUserIds: byUserIds()
}

export default commentLoader
