import { Box, Button, Text } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import React, { useState } from 'react'
import Field from '../../components/Field'
import Layout from '../../components/Layout'
import {
	MeDocument,
	MeQuery,
	useChangePasswordMutation
} from '../../generated/graphql'
import { withApollo } from '../../lib/apollo/withApollo'
import errorMap from '../../lib/util/errorMap'

const ForgotPassword: NextPage = () => {
	const router = useRouter()
	const [changePassword] = useChangePasswordMutation()
	const [tokenError, setTokenError] = useState('')
	return (
		<Layout variant="small">
			<Box bgColor={'blue.700'} p={6} rounded={'md'}>
				<Formik
					initialValues={{ newPassword: '' }}
					onSubmit={async (values, { setErrors }) => {
						console.log(values)
						const response = await changePassword({
							variables: {
								newPassword: values.newPassword,
								token:
									typeof router.query.token === 'string'
										? router.query.token
										: ''
							},
							update: (cache, { data }) => {
								cache.writeQuery<MeQuery>({
									query: MeDocument,
									data: {
										__typename: 'Query',
										me: data?.changePassword.user
									}
								})
							}
						})
						if (response.data?.changePassword.errors) {
							const errors = errorMap(response.data.changePassword.errors)
							if ('token' in errors) setTokenError(errors.token)
							setErrors(errors)
						} else if (response.data?.changePassword.user) {
							router.push('/')
						}
					}}
				>
					{() => (
						<Form>
							<Field
								name="newPassword"
								type="password"
								placeholder="Password"
								label="Password"
							/>
							{tokenError ? <Text color={'red.500'}>{tokenError}</Text> : null}
							<Button type="submit" mt={6} bgColor="red.500">
								Change Register
							</Button>
						</Form>
					)}
				</Formik>
			</Box>
		</Layout>
	)
}

export default withApollo({ ssr: false })(ForgotPassword)
