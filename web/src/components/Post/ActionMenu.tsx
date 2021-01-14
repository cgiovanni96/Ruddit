import {
	DeleteIcon as DeletePostIcon,
	EditIcon as EditPostIcon
} from '@chakra-ui/icons'
import { Flex, IconButton, Link, Spacer } from '@chakra-ui/react'
import RouterLink from 'next/link'
import React from 'react'
import { useDeletePostMutation } from '../../generated/graphql'

interface ActionMenuProps {
	postId: string
}

const ActionMenu: React.FC<ActionMenuProps> = ({ postId }) => {
	const [deletePost] = useDeletePostMutation()

	const deleteOnClick = async () => {
		await deletePost({
			variables: { id: postId },
			update: (cache) => {
				cache.evict({ id: 'Post:' + postId })
			}
		})
	}
	return (
		<Flex ml={1}>
			<RouterLink href={'/post/edit/[id]'} as={`/post/edit/${postId}`}>
				<IconButton as={Link} aria-label="Edit Post" icon={<EditPostIcon />} />
			</RouterLink>
			<Spacer mx={1} />
			<IconButton
				aria-label="Delete Post"
				icon={<DeletePostIcon />}
				onClick={() => deleteOnClick()}
			/>
		</Flex>
	)
}

export default ActionMenu
