// https://stackoverflow.com/questions/9035627/elegant-method-to-generate-array-of-random-dates-within-two-dates
export default (start: Date, end: Date) => {
	const date = new Date(
		start.getTime() + Math.random() * (end.getTime() - start.getTime())
	)

	return date
}
