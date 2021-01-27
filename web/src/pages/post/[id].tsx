import { Box, Flex, Heading } from '@chakra-ui/react'
import React from 'react'
import Error from '../../components/Error'
import Layout from '../../components/Layout'
import Loading from '../../components/Loading'
import TextMd from '../../components/TextMd'
import { usePostQuery } from '../../generated/graphql'
import { withApollo } from '../../lib/apollo/withApollo'
import useGetId from '../../lib/hook/useGetId'

const Post: React.FC = ({}) => {
	const id = useGetId()
	const { error, loading, data } = usePostQuery({ variables: { id } })

	if (error || !data) {
		return <Error />
	}

	if (loading) {
		return <Loading />
	}

	if (!data.post) {
		return <Error text={'Post not found'} />
	}

	return (
		<Layout>
			<Box mt={6} p={8} bgColor={'gray.900'} rounded={'lg'}>
				<Flex flexDir={'column'}>
					<Heading as={'h2'}>{data.post.title}</Heading>
					<Box>
						<Box>
							<TextMd text={data.post.text} />
						</Box>
					</Box>
				</Flex>
			</Box>
		</Layout>
	)
}

export default withApollo({ ssr: true })(Post)
