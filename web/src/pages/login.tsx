import { Button, Spacer, Flex, Center, Box } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import React from 'react'
import { useRouter } from 'next/dist/client/router'

import { MeDocument, MeQuery, useLoginMutation } from '../generated/graphql'
import Container from '../components/Container'
import Field from '../components/Field'
import errorMap from '../lib/util/errorMap'
import { withApollo } from '../lib/apollo/withApollo'

// interface RegisterProps {}

const Login: React.FC = ({}) => {
	const router = useRouter()
	const [login] = useLoginMutation()
	return (
		<Container variant="small">
			<Box bgColor={'blue.700'} p={6} rounded={'md'}>
				<Formik
					initialValues={{ name: '', password: '', email: '' }}
					onSubmit={async (values, { setErrors }) => {
						console.log(values)
						const response = await login({
							variables: { data: values },
							update: (cache, { data }) => {
								cache.writeQuery<MeQuery>({
									query: MeDocument,
									data: {
										__typename: 'Query',
										me: data?.login.user
									}
								})
							}
						})
						if (response.data?.login.errors) {
							setErrors(errorMap(response.data.login.errors))
						} else if (response.data?.login.user) {
							router.push('/')
						}
					}}
				>
					{({ values, handleChange, isSubmitting }) => (
						<Form>
							<Flex>
								<Field name="name" placeholder="Username" label="Username" />
								<Spacer mr={6} />
								<Field
									name="email"
									type="email"
									placeholder="Email"
									label="Email"
								/>
							</Flex>
							<Spacer mt={6} />
							<Field
								name="password"
								type="password"
								placeholder="Password"
								label="Password"
							/>
							<Center>
								<Button type="submit" mt={6} bgColor="green.200">
									Login
								</Button>
							</Center>
						</Form>
					)}
				</Formik>
			</Box>
		</Container>
	)
}

export default withApollo({ ssr: false })(Login)
