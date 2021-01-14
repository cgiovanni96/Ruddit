import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Textarea
} from '@chakra-ui/react'
import { useField } from 'formik'
import React, { InputHTMLAttributes } from 'react'

type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
	name: string
	label: string
	isTextarea?: boolean
}

const Field: React.FC<FieldProps> = ({
	label,
	isTextarea,
	size: _,
	...props
}) => {
	let InputField: any = Input
	if (isTextarea) InputField = Textarea
	const [field, { error }] = useField(props)
	return (
		<FormControl isInvalid={!!error}>
			<FormLabel htmlFor={field.name}>{label}</FormLabel>
			<InputField {...field} {...props} id={field.name} />
			{error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
		</FormControl>
	)
}

export default Field
