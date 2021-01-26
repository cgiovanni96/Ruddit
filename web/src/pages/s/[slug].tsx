import { Box, Button, Center, Flex, Heading, Stack } from '@chakra-ui/react'
import React from 'react'
import Layout from '../../components/Layout'
import Post from '../../components/Post/Post'
import Vote from '../../components/Post/Vote'
import TextMd from '../../components/TextMd'
import {
	useMeQuery,
	usePostsQuery,
	useSubrudditQuery
} from '../../generated/graphql'
import { withApollo } from '../../lib/apollo/withApollo'
import useGetSlug from '../../lib/hook/useGetSlug'

const Sub: React.FC = ({}) => {
	const slug = useGetSlug()
	const { error: subrudditError, data: subrudditData } = useSubrudditQuery({
		variables: { slug }
	})
	const { data: meData } = useMeQuery()

	if (subrudditError || !subrudditData || !subrudditData.subruddit || !meData) {
		return <div>Error...</div>
	}

	const {
		loading: postLoading,
		error: postError,
		variables: postVariables,
		fetchMore,
		data: postData
	} = usePostsQuery({
		variables: {
			limit: 10,
			cursor: null,
			subrudditId: subrudditData.subruddit.id
		}
	})

	const fetchMorePosts = () => {
		fetchMore({
			variables: {
				limit: postVariables?.limit,
				cursor:
					postData?.posts.posts[postData.posts.posts.length - 1].createdAt,
				subrudditId: postVariables?.subrudditId
			}
		})
	}

	if (postError || !postData) {
		return <div>Error...</div>
	}

	return (
		<Layout>
			<Box mt={6} p={8} bgColor={'gray.900'} rounded={'lg'}>
				<Flex flexDir={'column'}>
					<Heading as={'h2'}>{subrudditData.subruddit.name}</Heading>
					<Box>
						<Box>
							<TextMd text={subrudditData.subruddit.description} />
						</Box>
					</Box>
				</Flex>
			</Box>

			<>
				<Stack spacing={6}>
					{postData.posts.posts.map((p) => {
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
									<Post post={p} loggedUserId={meData.me?.id} />
								</Flex>
							</Box>
						)
					})}
				</Stack>
				{postData.posts.hasMore ? (
					<Center mt={4}>
						<Button
							onClick={fetchMorePosts}
							isLoading={postLoading}
							bgColor={'blue.400'}
							colorScheme={'blue'}
						>
							More
						</Button>
					</Center>
				) : null}
			</>
		</Layout>
	)
}

export default withApollo({ ssr: true })(Sub)
