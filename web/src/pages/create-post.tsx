import { Button, Spacer } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Editor from '../components/Editor/Editor'
import Field from '../components/Field'
import Layout from '../components/Layout'
import { useCreatePostMutation } from '../generated/graphql'
import { withApollo } from '../lib/apollo/withApollo'
import useIsAuthorized from '../lib/hook/useIsAuthorized'

const CreatePost: React.FC = ({}) => {
	const [createPost] = useCreatePostMutation()
	const router = useRouter()
	useIsAuthorized()

	const [postText, setPostText] = useState('')

	return (
		<Layout variant="regular">
			<Formik
				initialValues={{ title: '' }}
				onSubmit={async (values) => {
					await createPost({
						variables: { data: { title: values.title, text: postText } },
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
						<Editor value={postText} setValue={setPostText} />
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
