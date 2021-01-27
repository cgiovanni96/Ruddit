import { Button, Spacer } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Editor from '../../../components/Editor/Editor'
import Field from '../../../components/Field'
import Layout from '../../../components/Layout'
import Loading from '../../../components/Loading'
import { usePostQuery, useUpdatePostMutation } from '../../../generated/graphql'
import { withApollo } from '../../../lib/apollo/withApollo'
import useGetId from '../../../lib/hook/useGetId'
import useIsAuthorized from '../../../lib/hook/useIsAuthorized'

const EditPost: React.FC = ({}) => {
	const router = useRouter()
	useIsAuthorized()
	const id = useGetId()
	const { error, loading, data } = usePostQuery({ variables: { id } })
	const [updatePost] = useUpdatePostMutation()
	const [postText, setPostText] = useState(data?.post?.text || '')

	if (error || !data) {
		return <div>Error</div>
	}

	if (loading) {
		return <Loading />
	}

	if (!data.post) {
		return <div> no post found </div>
	}

	return (
		<Layout variant="regular">
			<Formik
				initialValues={{ title: data.post.title, text: data.post.text }}
				onSubmit={async (values) => {
					await updatePost({
						variables: { id, title: values.title, text: postText }
					})
					router.back()
				}}
			>
				{() => (
					<Form>
						<Field name="title" placeholder="Title" label="Title" />
						<Spacer mt={6} />
						<Editor value={postText} setValue={setPostText} />
						<Spacer mt={6} />
						<Button type="submit" mt={6} bgColor="red.500">
							Edit
						</Button>
					</Form>
				)}
			</Formik>
		</Layout>
	)
}

export default withApollo({ ssr: false })(EditPost)
