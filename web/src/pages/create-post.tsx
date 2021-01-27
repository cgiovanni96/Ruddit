import { Button, Spacer } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Editor from '../components/Editor/Editor'
import Field from '../components/Field'
import Layout from '../components/Layout'
import SelectSubruddits from '../components/SelectSubruddits'
import {
	useCreatePostMutation,
	useSubrudditsListQuery
} from '../generated/graphql'
import { withApollo } from '../lib/apollo/withApollo'
import useIsAuthorized from '../lib/hook/useIsAuthorized'

interface CreatePostProps {
	subruddit?: string
}

const CreatePost: React.FC<CreatePostProps> = ({ subruddit }) => {
	const [createPost] = useCreatePostMutation()
	const router = useRouter()
	const { error, loading, data } = useSubrudditsListQuery()
	const [postText, setPostText] = useState('')
	useIsAuthorized()

	if (error || !data) {
		return <div> Error ...</div>
	}
	if (loading) {
		return <div>Loading</div>
	}

	if (!data.easySubruddits) {
		return <div>Subruddits not found</div>
	}

	return (
		<Layout variant="regular">
			<Formik
				initialValues={{ title: '', subruddit: '' }}
				onSubmit={async (values) => {
					await createPost({
						variables: {
							data: {
								title: values.title,
								text: postText,
								subrudditId: values.subruddit
							}
						},
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
						<SelectSubruddits
							name="subruddit"
							subruddits={data.easySubruddits}
						/>
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
