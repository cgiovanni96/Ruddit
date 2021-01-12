import { Spacer, Button } from '@chakra-ui/react'
import { Formik, Form } from 'formik'
import React from 'react'
import { withApollo } from '../lib/apollo/withApollo'
import Field from '../components/Field'
import { useCreatePostMutation } from '../generated/graphql'
import { useRouter } from 'next/router'
import useIsAuthorized from '../lib/hook/useIsAuthorized'
import Layout from '../components/Layout'

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
				{({ values, handleChange, isSubmitting }) => (
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
