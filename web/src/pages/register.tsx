import { Button, Spacer } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import React from 'react'
import { useRouter } from 'next/dist/client/router'

import { MeDocument, MeQuery, useRegisterMutation } from '../generated/graphql'
import Container from '../components/Container'
import Field from '../components/Field'
import errorMap from '../lib/util/errorMap'
import { withApollo } from '../lib/apollo/withApollo'

// interface RegisterProps {}

const Register: React.FC = ({}) => {
	const router = useRouter()
	const [register] = useRegisterMutation()
	return (
		<Container variant="small">
			<Formik
				initialValues={{ name: '', password: '' }}
				onSubmit={async (values, { setErrors }) => {
					console.log(values)
					const response = await register({
						variables: { data: values },
						update: (cache, { data }) => {
							cache.writeQuery<MeQuery>({
								query: MeDocument,
								data: {
									__typename: 'Query',
									me: {
										user: data?.register.user
									}
								}
							})
						}
					})
					if (response.data?.register.errors) {
						setErrors(errorMap(response.data.register.errors))
					} else if (response.data?.register.user) {
						router.push('/')
					}
				}}
			>
				{({ values, handleChange, isSubmitting }) => (
					<Form>
						<Field name="name" placeholder="Username" label="Username" />
						<Spacer mt={6} />
						<Field
							name="password"
							type="password"
							placeholder="Password"
							label="Password"
						/>
						<Button type="submit" mt={6} bgColor="red.500">
							Register
						</Button>
					</Form>
				)}
			</Formik>
		</Container>
	)
}

export default withApollo({ ssr: false })(Register)
