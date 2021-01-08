import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input
} from '@chakra-ui/react'
import { useField } from 'formik'
import React, { InputHTMLAttributes } from 'react'

type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
	name: string
	label: string
}

const Field: React.FC<FieldProps> = ({ label, size, ...props }) => {
	const [field, { error }] = useField(props)
	console.log('error', error)
	return (
		<FormControl isInvalid={!!error}>
			<FormLabel htmlFor={field.name}>{label}</FormLabel>
			<Input {...field} {...props} id={field.name} />
			{error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
		</FormControl>
	)
}

export default Field