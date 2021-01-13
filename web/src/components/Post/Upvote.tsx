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

interface UpvoteProps {
	post: PostSnippetFieldsFragment
}

const Upvote: React.FC<UpvoteProps> = ({ post }) => {
	const [vote] = useVoteMutation()

	const voteOnClick = (value: number) => {
		vote({ variables: { postId: post.id, value } })
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
