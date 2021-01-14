import { gql } from '@apollo/client'
import {
	ChevronDownIcon as DownvoteIcon,
	ChevronUpIcon as UpvoteIcon
} from '@chakra-ui/icons'
import { Flex, IconButton, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import {
	PostSnippetFieldsFragment,
	useVoteMutation
} from '../../generated/graphql'

interface UpvoteProps {
	post: PostSnippetFieldsFragment
}

type VotedPostFragment = {
	id: string
	points: number
	voteStatus: number
}

const votingFragment = gql`
	fragment _ on Post {
		id
		points
		voteStatus
	}
`

const Vote: React.FC<UpvoteProps> = ({ post }) => {
	const [vote] = useVoteMutation()
	const [loading, setLoading] = useState<
		'upvote-loading' | 'downvote-loading' | 'not-loading'
	>('not-loading')

	const voteOnClick = async (value: number) => {
		await vote({
			variables: { postId: post.id, value },
			update: (cache) => {
				const postId = 'Post:' + post.id
				const data = cache.readFragment<VotedPostFragment>({
					id: postId,
					fragment: votingFragment
				})

				if (data) {
					if (data.voteStatus === value) return
					const factor = !data.voteStatus ? 1 : 2
					const factorizedValue = data.points + factor * value

					cache.writeFragment({
						id: postId,
						fragment: votingFragment,
						data: { points: factorizedValue, voteStatus: value }
					})
				}
			}
		})
	}

	return (
		<Flex
			flexDir={'column'}
			alignItems={'center'}
			justifyContent={'center'}
			spacing={4}
		>
			<IconButton
				icon={<UpvoteIcon boxSize={'24px'} color={'gray.800'} />}
				aria-label={'Upvote post'}
				colorScheme={post.voteStatus === 1 ? 'green' : undefined}
				onClick={async () => {
					if (post.voteStatus === 1) return
					setLoading('upvote-loading')
					await voteOnClick(1)
					setLoading('not-loading')
				}}
				isLoading={loading === 'upvote-loading'}
			/>
			<Text my={2} color={'gray.500'}>
				{post.points}
			</Text>
			<IconButton
				icon={<DownvoteIcon boxSize={'24px'} color={'gray.800'} />}
				aria-label={'Upvote post'}
				colorScheme={post.voteStatus === -1 ? 'red' : undefined}
				onClick={async () => {
					if (post.voteStatus === -1) return
					setLoading('downvote-loading')
					await voteOnClick(-1)
					setLoading('not-loading')
				}}
				isLoading={loading === 'downvote-loading'}
			/>
		</Flex>
	)
}

export default Vote
