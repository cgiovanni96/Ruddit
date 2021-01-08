import { FieldError } from '../../generated/graphql'

const errorMap = (errors: FieldError[]): Record<string, string> => {
	const res: Record<string, string> = {}
	errors.forEach(({ field, message }) => {
		res[field] = message
	})
	return res
}

export default errorMap
