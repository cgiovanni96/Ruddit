import { Box, Flex, Heading, Spacer, Stack, Text } from '@chakra-ui/react'
import Layout from '../components/Layout'
import { usePostsQuery } from '../generated/graphql'
import { withApollo } from '../lib/apollo/withApollo'

const Index: React.FC = () => {
	const { data, loading } = usePostsQuery()

	if (!loading && !data) {
		return <div>Something happened</div>
	}

	return (
		<Layout>
			<Flex flexDir={'column'}>
				{data?.posts.map((p) => {
					return (
						<Box key={p.id} mt={8} p={4} rounded={'lg'} bgColor={'green.300'}>
							<Flex flexDir={'column'}>
								<Heading as={'h3'} size={'lg'} color={'gray.800'}>
									{p.title}
								</Heading>
								<Spacer mt={2} />
								<Text fontSize={'md'} color={'gray.800'}>
									{p.text}
								</Text>
							</Flex>
						</Box>
					)
				})}
			</Flex>
		</Layout>
	)
}

export default withApollo({ ssr: false })(Index)
