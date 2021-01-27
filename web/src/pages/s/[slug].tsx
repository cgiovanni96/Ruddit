import { Box, Button, Center, Flex, Heading, Stack } from '@chakra-ui/react'
import React from 'react'
import Layout from '../../components/Layout'
import Loading from '../../components/Loading'
import Post from '../../components/Post/Post'
import Vote from '../../components/Post/Vote'
import TextMd from '../../components/TextMd'
import { useMeQuery, useSubrudditsPostsQuery } from '../../generated/graphql'
import { withApollo } from '../../lib/apollo/withApollo'
import useGetSlug from '../../lib/hook/useGetSlug'

const Sub: React.FC = ({}) => {
	const slug = useGetSlug()
	const { data: meData } = useMeQuery()

	const query = useSubrudditsPostsQuery({
		variables: {
			limit: 10,
			cursor: null,
			subrudditSlug: slug
		}
	})

	if (query.loading) {
		return <Loading />
	}

	if (query.error || !query.data || !meData) {
		return <div>Error data ...</div>
	}

	const subruddit = query.data.posts.posts[0].subruddit

	const fetchMorePosts = () => {
		query.fetchMore({
			variables: {
				limit: query.variables?.limit,
				cursor:
					query.data?.posts.posts[query.data.posts.posts.length - 1].createdAt,
				subrudditId: subruddit.id
			}
		})
	}

	return (
		<Layout>
			<Box mt={6} p={8} bgColor={'gray.900'} rounded={'lg'}>
				<Flex flexDir={'column'}>
					<Heading as={'h2'}>{subruddit.name}</Heading>
					<Box>
						<Box>
							<TextMd text={subruddit.description} />
						</Box>
					</Box>
				</Flex>
			</Box>

			<>
				<Stack spacing={6}>
					{query.data.posts.posts.map((p) => {
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
				{query.data.posts.hasMore ? (
					<Center mt={4}>
						<Button
							onClick={fetchMorePosts}
							isLoading={query.loading}
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
