import { Box, Flex, Heading, Link, Spacer, Text } from '@chakra-ui/react'
import React from 'react'
import RouterLink from 'next/link'
import { PostSnippetFieldsFragment } from '../../generated/graphql'

interface PostProps {
	post: PostSnippetFieldsFragment
}

const Post: React.FC<PostProps> = ({ post }) => {
	return (
		<Box ml={6} flex={1}>
			<Flex>
				<RouterLink href={'post/[id]'} as={`post/${post.id}`}>
					<Link>
						<Heading as={'h3'} size={'lg'}>
							{post.title}
						</Heading>
					</Link>
				</RouterLink>
				<Spacer />
				<Text size={'md'} color={'green.800'}>
					by {post.author.name}
				</Text>
			</Flex>
			<Spacer mt={2} />
			<Text fontSize={'md'}>{post.textSnippet}&hellip;</Text>
		</Box>
	)
}

export default Post
