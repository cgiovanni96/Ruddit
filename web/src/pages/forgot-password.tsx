import { Box, Button, Container, Text } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import Field from '../components/Field'
import { useForgotPasswordMutation } from '../generated/graphql'
import { withApollo } from '../lib/apollo/withApollo'

const ForgotPassword: React.FC = ({}) => {
	const [forgotPassword] = useForgotPasswordMutation()
	const [complete, setComplete] = useState(false)

	return complete ? (
		<Box>
			<Text>We sent you an email</Text>
		</Box>
	) : (
		<Container variant="small">
			<Box bgColor={'blue.700'} p={6} rounded={'md'}>
				<Formik
					initialValues={{ email: '' }}
					onSubmit={async (values) => {
						await forgotPassword({ variables: { email: values.email } })
						setComplete(true)
					}}
				>
					{() => (
						<Form>
							<Field
								name="email"
								type="email"
								placeholder="Email"
								label="Email"
							/>
							<Button type="submit" mt={6} bgColor="red.500">
								Forgot Password
							</Button>
						</Form>
					)}
				</Formik>
			</Box>
		</Container>
	)
}

export default withApollo({ ssr: false })(ForgotPassword)
