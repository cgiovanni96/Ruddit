const randomSubId = (subIds: string[] | undefined): string => {
	if (subIds) {
		const min = Math.ceil(0)
		const max = Math.floor(subIds.length - 1)
		const id = Math.floor(Math.random() * (max - min + 1)) + min
		return subIds[id]
	} else {
		return '249350ba-9de6-4ce2-966d-e4ff205fe437'
	}
}

export default randomSubId
