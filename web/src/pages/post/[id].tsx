import { useRouter } from 'next/router'
import React from 'react'
import { withApollo } from '../../lib/apollo/withApollo'

import { usePostQuery } from '../../generated/graphql'
import Layout from '../../components/Layout'
import { Box, Flex, Heading, Text } from '@chakra-ui/react'

const Post: React.FC = ({}) => {
	const router = useRouter()
	const id: string = typeof router.query.id === 'string' ? router.query.id : ''
	const { loading, error, data } = usePostQuery({
		variables: { id }
	})

	if (error || !data) {
		return <div>Error</div>
	}

	if (loading) {
		return <div>Loading</div>
	}

	return (
		<Layout>
			<Box mt={6} p={8} bgColor={'gray.900'} rounded={'lg'}>
				<Flex flexDir={'column'}>
					<Heading as={'h2'}>{data.post?.title}</Heading>
					<Box>
						<Text>{data.post?.text}</Text>
					</Box>
				</Flex>
			</Box>
		</Layout>
	)
}

export default withApollo({ ssr: true })(Post)
