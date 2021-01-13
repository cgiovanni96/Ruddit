import DataLoader from 'dataloader'
import User from '../../database/entity/User'

const authorLoader = () =>
	new DataLoader<string, User>(async (authorIds) => {
		const authors = await User.findByIds(authorIds as string[])
		const authorArray: Record<string, User> = {}
		authors.forEach((u) => {
			authorArray[u.id] = u
		})

		return authorIds.map((id) => authorArray[id])
	})

export default authorLoader
