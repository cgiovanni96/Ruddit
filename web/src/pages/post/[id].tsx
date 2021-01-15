import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import Layout from '../../components/Layout'
import TextMd from '../../components/TextMd'
import { usePostQuery } from '../../generated/graphql'
import { withApollo } from '../../lib/apollo/withApollo'
import useGetId from '../../lib/hook/useGetId'

const Post: React.FC = ({}) => {
	const id = useGetId()
	const { error, loading, data } = usePostQuery({ variables: { id } })

	if (error || !data) {
		return <div>Error</div>
	}

	if (loading) {
		return <div>Loading</div>
	}

	if (!data.post) {
		return <div> post not found</div>
	}

	return (
		<Layout>
			<Box mt={6} p={8} bgColor={'gray.900'} rounded={'lg'}>
				<Flex flexDir={'column'}>
					<Heading as={'h2'}>{data.post.title}</Heading>
					<Box>
						<Text>
							<TextMd text={data.post.text} />
						</Text>
					</Box>
				</Flex>
			</Box>
		</Layout>
	)
}

export default withApollo({ ssr: true })(Post)
