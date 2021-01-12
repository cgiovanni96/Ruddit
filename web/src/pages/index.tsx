import {
	Box,
	Button,
	Center,
	Flex,
	Heading,
	Link,
	Spacer,
	Stack,
	Text
} from '@chakra-ui/react'
import Layout from '../components/Layout'
import RouterLink from 'next/link'
import { usePostsQuery } from '../generated/graphql'
import { withApollo } from '../lib/apollo/withApollo'

const Index: React.FC = () => {
	const { data, loading, fetchMore, variables } = usePostsQuery({
		variables: {
			limit: 2,
			cursor: null
		},
		notifyOnNetworkStatusChange: true
	})

	if (!loading && !data) {
		return <div>Something happened</div>
	}

	const fetchMorePosts = () => {
		fetchMore({
			variables: {
				limit: variables?.limit,
				cursor: data?.posts.posts[data.posts.posts.length - 1].createdAt
			}
		})
	}

	return (
		<Layout>
			<Flex mt={6} alignItems={'center'}>
				<Heading as={'h2'} color={'white'}>
					Welcome
				</Heading>
				<RouterLink href="/create-post">
					<Link ml={'auto'}>Add Post</Link>
				</RouterLink>
			</Flex>
			<Stack spacing={6}>
				{data?.posts.posts.map((p) => {
					return (
						<Box key={p.id} mt={8} p={4} rounded={'lg'} bgColor={'green.300'}>
							<Flex flexDir={'column'}>
								<Heading as={'h3'} size={'lg'} color={'gray.800'}>
									{p.title}
								</Heading>
								<Spacer mt={2} />
								<Text fontSize={'md'} color={'gray.800'}>
									{p.textSnippet}&hellip;
								</Text>
							</Flex>
						</Box>
					)
				})}
			</Stack>
			{data && data.posts.hasMore ? (
				<Center mt={4}>
					<Button
						onClick={fetchMorePosts}
						isLoading={loading}
						bgColor={'blue.400'}
						colorScheme={'blue'}
					>
						More
					</Button>
				</Center>
			) : null}
		</Layout>
	)
}

export default withApollo({ ssr: false })(Index)
