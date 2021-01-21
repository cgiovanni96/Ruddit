import DataLoader from 'dataloader'
import User from '../../database/entity/User'

const userLoader = () =>
	new DataLoader<string, User>(async (userIds) => {
		const users = await User.findByIds(userIds as string[])
		const usersArray: Record<string, User> = {}
		users.forEach((u) => {
			usersArray[u.id] = u
		})

		return userIds.map((id) => usersArray[id])
	})

export default userLoader
