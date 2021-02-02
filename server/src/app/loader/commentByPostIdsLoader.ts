import DataLoader from 'dataloader'
import { getConnection, In } from 'typeorm'
import Comment from '../../database/entity/Comment'

const commentByPostIdsLoader = () =>
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

export default commentByPostIdsLoader
