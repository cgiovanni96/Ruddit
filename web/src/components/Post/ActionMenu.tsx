import { Flex, IconButton, Spacer } from '@chakra-ui/react'
import React from 'react'
import {
	DeleteIcon as DeletePostIcon,
	EditIcon as EditPostIcon
} from '@chakra-ui/icons'
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
			<IconButton aria-label="Edit Post" icon={<EditPostIcon />} />
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
