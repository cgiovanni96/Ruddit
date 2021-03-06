import { Button, Spacer } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/dist/client/router'
import React from 'react'
import Field from '../components/Field'
import Layout from '../components/Layout'
import { MeDocument, MeQuery, useRegisterMutation } from '../generated/graphql'
import { withApollo } from '../lib/apollo/withApollo'
import errorMap from '../lib/util/errorMap'

const Register: React.FC = ({}) => {
	const router = useRouter()
	const [register] = useRegisterMutation()
	return (
		<Layout variant="small">
			<Formik
				initialValues={{ name: '', password: '', email: '' }}
				onSubmit={async (values, { setErrors }) => {
					console.log(values)
					const response = await register({
						variables: { data: values },
						update: (cache, { data }) => {
							cache.writeQuery<MeQuery>({
								query: MeDocument,
								data: {
									__typename: 'Query',
									me: data?.register.user
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
				{() => (
					<Form>
						<Field name="name" placeholder="Username" label="Username" />
						<Spacer mt={6} />
						<Field
							name="email"
							type="email"
							placeholder="email"
							label="Email"
						/>
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
		</Layout>
	)
}

export default withApollo({ ssr: false })(Register)
