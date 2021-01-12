// https://stackoverflow.com/questions/1199352/smart-way-to-truncate-long-strings
const truncateString = (
	str: string,
	n: number,
	useWordBoundary: boolean = true
): string => {
	if (str.length <= n) {
		return str
	}
	const subString = str.substr(0, n - 1) // the original check
	return useWordBoundary
		? subString.substr(0, subString.lastIndexOf(' '))
		: subString
}

export default truncateString
