import { FormControl, FormLabel, Select } from '@chakra-ui/react'
import { useField } from 'formik'
import React, { InputHTMLAttributes } from 'react'
import { SubrudditFieldsFragment } from '../generated/graphql'

type SelectSubrudditsProps = InputHTMLAttributes<HTMLInputElement> & {
	name: string
	subruddits: SubrudditFieldsFragment[]
}

const SelectSubruddits: React.FC<SelectSubrudditsProps> = ({
	subruddits,
	size: _,
	...props
}) => {
	const [field] = useField(props)

	return (
		<FormControl defaultValue={''} id={field.name}>
			<FormLabel>Subruddit</FormLabel>
			<Select {...field} id={field.name} placeholder="Select Subruddits">
				{subruddits.map((sub) => {
					return (
						<option key={sub.id} value={sub.id}>
							{sub.name}
						</option>
					)
				})}
			</Select>
		</FormControl>
	)
}

export default SelectSubruddits
