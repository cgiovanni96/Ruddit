import { Button, Spacer } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import React from 'react'
import Field from '../../../components/Field'
import Layout from '../../../components/Layout'
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

	if (error || !data) {
		return <div>Error</div>
	}

	if (loading) {
		return <div>Loading</div>
	}

	if (!data.post) {
		return <div> no post found </div>
	}

	return (
		<Layout variant="small">
			<Formik
				initialValues={{ title: data.post.title, text: data.post.text }}
				onSubmit={async (values) => {
					await updatePost({ variables: { id, ...values } })
					router.back()
				}}
			>
				{() => (
					<Form>
						<Field name="title" placeholder="Title" label="Title" />
						<Spacer mt={6} />
						<Field name="text" isTextarea placeholder="Text" label="Text" />
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
