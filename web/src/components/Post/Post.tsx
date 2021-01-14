import { Box, Flex, Heading, Link, Spacer, Text } from '@chakra-ui/react'

import React from 'react'
import RouterLink from 'next/link'

import { PostSnippetFieldsFragment } from '../../generated/graphql'
import ActionMenu from './ActionMenu'

interface PostProps {
	post: PostSnippetFieldsFragment
	loggedUserId: string | undefined
}

const Post: React.FC<PostProps> = ({ post, loggedUserId }) => {
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
				{loggedUserId && loggedUserId === post.author.id ? (
					<ActionMenu postId={post.id} />
				) : null}
			</Flex>
			<Text size={'md'} color={'green.800'}>
				by {post.author.name}
			</Text>
			<Spacer mt={2} />
			<Text fontSize={'md'}>{post.textSnippet}&hellip;</Text>
		</Box>
	)
}

export default Post
