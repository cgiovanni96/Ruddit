import { Stack, Box, Flex, Center, Button } from '@chakra-ui/react'
import React from 'react'
import { PostsQuery } from '../generated/graphql'
import Post from './Post/Post'
import Vote from './Post/Vote'

interface PaginatedPostsProps {
	paginatedQuery: PostsQuery
	fetchMorePosts: any
	loading: boolean
	userId?: string
}

const PaginatedPosts: React.FC<PaginatedPostsProps> = ({
	paginatedQuery,
	fetchMorePosts,
	loading,
	userId
}) => {
	return (
		<>
			<Stack spacing={6}>
				{paginatedQuery.posts.posts.map((p) => {
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
								<Post post={p} loggedUserId={userId} />
							</Flex>
						</Box>
					)
				})}
			</Stack>
			{paginatedQuery.posts.hasMore ? (
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
		</>
	)
}

export default PaginatedPosts
