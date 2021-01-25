import { Button, Spacer } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import React from 'react'
import Field from '../components/Field'
import Layout from '../components/Layout'
import { useCreateSubrudditMutation } from '../generated/graphql'
import { withApollo } from '../lib/apollo/withApollo'
import useIsAuthorized from '../lib/hook/useIsAuthorized'

const CreateSubruddit: React.FC = ({}) => {
	const [createSubruddit] = useCreateSubrudditMutation()
	const router = useRouter()

	useIsAuthorized()

	return (
		<Layout variant="regular">
			<Formik
				initialValues={{ name: '', description: '', slug: '' }}
				onSubmit={async (values) => {
					await createSubruddit({
						variables: {
							data: {
								...values
							}
						},
						update: (cache) => {
							cache.evict({ fieldName: 'subruddits:{}' })
						}
					})
					router.push('/')
				}}
			>
				{() => (
					<Form>
						<Field name="name" placeholder="Name" label="Name" />
						<Spacer mt={6} />
						<Field name="slug" placeholder="Slug" label="Slug" />
						<Spacer mt={6} />
						<Field
							name="description"
							placeholder="Description"
							label="Description"
						/>
						<Spacer mt={6} />
						<Button type="submit" mt={6} bgColor="red.500">
							Create
						</Button>
					</Form>
				)}
			</Formik>
		</Layout>
	)
}

export default withApollo({ ssr: true })(CreateSubruddit)
