import { Button, Spacer } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import React from 'react'
import Field from '../components/Field'
import Layout from '../components/Layout'
import { useCreatePostMutation } from '../generated/graphql'
import { withApollo } from '../lib/apollo/withApollo'
import useIsAuthorized from '../lib/hook/useIsAuthorized'

const CreatePost: React.FC = ({}) => {
	const [createPost] = useCreatePostMutation()
	const router = useRouter()
	useIsAuthorized()

	return (
		<Layout variant="small">
			<Formik
				initialValues={{ title: '', text: '' }}
				onSubmit={async (values) => {
					await createPost({
						variables: { data: values },
						update: (cache) => {
							cache.evict({ fieldName: 'posts:{}' })
						}
					})
					router.push('/')
				}}
			>
				{() => (
					<Form>
						<Field name="title" placeholder="Title" label="Title" />
						<Spacer mt={6} />
						<Field name="text" isTextarea placeholder="Text" label="Text" />
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

export default withApollo({ ssr: false })(CreatePost)
