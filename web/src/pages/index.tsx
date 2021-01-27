import {
	Box,
	Button,
	Center,
	Flex,
	Heading,
	Link,
	Stack
} from '@chakra-ui/react'
import RouterLink from 'next/link'
import React from 'react'
import Layout from '../components/Layout'
import Post from '../components/Post/Post'
import Vote from '../components/Post/Vote'
import { usePostsQuery, useMeQuery } from '../generated/graphql'
import { withApollo } from '../lib/apollo/withApollo'

const Index: React.FC = () => {
	const { data, loading, fetchMore, variables } = usePostsQuery({
		variables: {
			limit: 2,
			cursor: null,
			subrudditSlug: null
		},
		notifyOnNetworkStatusChange: true
	})

	const { data: meData } = useMeQuery()

	if (!data || !data.posts) {
		return <div>Error</div>
	}

	const fetchMorePosts = () => {
		fetchMore({
			variables: {
				limit: variables?.limit,
				cursor: data?.posts.posts[data.posts.posts.length - 1].createdAt,
				subrudditId: variables?.subrudditSlug
			}
		})
	}

	return (
		<Layout>
			<Flex mt={6} alignItems={'center'}>
				<Heading as={'h2'} color={'white'}>
					Welcome
				</Heading>
				<Box ml={'auto'}>
					<RouterLink href="/subruddits">
						<Link>Subruddits List</Link>
					</RouterLink>
					<RouterLink href="/create-post">
						<Link ml={8}>Add Post</Link>
					</RouterLink>
				</Box>
			</Flex>
			<Stack spacing={6}>
				{data?.posts.posts.map((p) => {
					return (
						<Box
							key={p.id}
							flex={1}
							mt={8}
							p={4}
							rounded={'lg'}
							bgColor={'gray.900'}
						>
							<Flex>
								<Vote post={p} />
								<Post post={p} loggedUserId={meData?.me?.id} />
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

export default withApollo({ ssr: true })(Index)
