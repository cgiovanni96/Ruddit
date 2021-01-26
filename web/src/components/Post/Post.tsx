import { Box, Flex, Heading, Link, Spacer, Text } from '@chakra-ui/react'
import RouterLink from 'next/link'
import React from 'react'
import { PostSnippetFieldsFragment } from '../../generated/graphql'
import TextMd from '../TextMd'
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
				by {post.author.name} ~ in{' '}
				<RouterLink href={'s/[slug]'} as={`s/${post.subruddit.slug}`}>
					<Link>{post.subruddit.name}</Link>
				</RouterLink>
			</Text>
			<Spacer mt={2} />
			<Box fontSize={'md'}>
				<TextMd text={post.textSnippet} snippet />
			</Box>
		</Box>
	)
}

export default Post
