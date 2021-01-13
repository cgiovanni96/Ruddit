import { Box, Flex, Heading, Spacer, Text } from '@chakra-ui/react'
import React from 'react'
import { PostSnippetFieldsFragment } from '../../generated/graphql'

interface PostProps {
	post: PostSnippetFieldsFragment
}

const Post: React.FC<PostProps> = ({ post }) => {
	return (
		<Box ml={6} flex={1}>
			<Flex>
				<Heading as={'h3'} size={'lg'} color={'gray.800'}>
					{post.title}
				</Heading>
				<Spacer />
				<Text size={'md'} color={'green.800'}>
					by {post.author.name}
				</Text>
			</Flex>
			<Spacer mt={2} />
			<Text fontSize={'md'} color={'gray.800'}>
				{post.textSnippet}&hellip;
			</Text>
		</Box>
	)
}

export default Post
