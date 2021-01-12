import { writeFileSync } from 'fs'

export default (
	location: string,
	message: string,
	format: string = 'txt'
): void => {
	writeFileSync(`src/database/logs/${location}.${format}`, message, {
		flag: 'as'
	})
}
