import DataLoader from 'dataloader'
import { getConnection, In } from 'typeorm'
import Comment from '../../database/entity/Comment'

const commentByUserIdsLoader = () =>
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

export default commentByUserIdsLoader
