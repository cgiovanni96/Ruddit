import React from 'react'
import { Flex, IconButton, Text } from '@chakra-ui/react'
import {
	ChevronUpIcon as UpvoteIcon,
	ChevronDownIcon as DownvoteIcon
} from '@chakra-ui/icons'
import {
	PostSnippetFieldsFragment,
	useVoteMutation
} from '../../generated/graphql'
import { gql } from '@apollo/client'

interface UpvoteProps {
	post: PostSnippetFieldsFragment
}

type VotedPostFragment = {
	id: string
	points: number
}

const votingFragment = gql`
	fragment _ on Post {
		id
		points
	}
`

const Upvote: React.FC<UpvoteProps> = ({ post }) => {
	const [vote] = useVoteMutation()

	const voteOnClick = (value: number) => {
		vote({
			variables: { postId: post.id, value },
			update: (cache) => {
				const postId = 'Post:' + post.id
				const data = cache.readFragment<VotedPostFragment>({
					id: postId,
					fragment: votingFragment
				})

				if (data) {
					cache.writeFragment({
						id: postId,
						fragment: votingFragment,
						data: { points: value }
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
				onClick={() => voteOnClick(1)}
			/>
			<Text color={'gray.800'}> {post.points} </Text>
			<IconButton
				icon={<DownvoteIcon boxSize={'24px'} color={'gray.800'} />}
				aria-label={'Upvote post'}
				onClick={() => voteOnClick(-1)}
			/>
		</Flex>
	)
}

export default Upvote
