import { Box, Button, Flex, Spacer } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/dist/client/router'
import RouterLink from 'next/link'
import React from 'react'
import Field from '../components/Field'
import Layout from '../components/Layout'
import { MeDocument, MeQuery, useLoginMutation } from '../generated/graphql'
import { withApollo } from '../lib/apollo/withApollo'
import errorMap from '../lib/util/errorMap'

// interface RegisterProps {}

const Login: React.FC = ({}) => {
	const router = useRouter()
	const [login] = useLoginMutation()
	return (
		<Layout variant="small">
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
								cache.evict({ fieldName: 'posts:{}' })
							}
						})
						if (response.data?.login.errors) {
							setErrors(errorMap(response.data.login.errors))
						} else if (response.data?.login.user) {
							if (typeof router.query?.next === 'string')
								router.push(router.query.next)
							else router.push('/')
						}
					}}
				>
					{({ values }) => (
						<Form>
							<Flex>
								<Field
									name="name"
									placeholder="Username"
									label="Username"
									disabled={values.email ? true : false}
								/>
								<Spacer mr={6} />
								<Field
									name="email"
									type="email"
									placeholder="Email"
									label="Email"
									disabled={values.name ? true : false}
								/>
							</Flex>
							<Spacer mt={6} />
							<Field
								name="password"
								type="password"
								placeholder="Password"
								label="Password"
							/>
							<Flex alignItems={'center'} mt={6}>
								<Button type="submit" bgColor="green.200" colorScheme={'green'}>
									Login
								</Button>
								<Spacer ml={4} />
								<RouterLink href="/forgot-password">
									<Button as={'button'} variant={'outline'} colorScheme={'red'}>
										Forgot Password
									</Button>
								</RouterLink>
							</Flex>
						</Form>
					)}
				</Formik>
			</Box>
		</Layout>
	)
}

export default withApollo({ ssr: false })(Login)
