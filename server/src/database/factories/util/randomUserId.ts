import userId from '../../userId'

const randomUserId = (userIds: string[] | undefined): string => {
	if (userIds) {
		const min = Math.ceil(0)
		const max = Math.floor(userIds.length - 1)
		const id = Math.floor(Math.random() * (max - min + 1)) + min
		return userIds[id]
	} else {
		return userId
	}
}

export default randomUserId
