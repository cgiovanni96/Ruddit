import { Button, Flex, Text } from '@chakra-ui/react'
import RouterLink from 'next/link'
import React from 'react'
import Layout from '../components/Layout'

interface ErrorProps {
	text?: string
}

const Error: React.FC<ErrorProps> = ({ text = 'Something happened...' }) => {
	return (
		<Layout>
			<Flex alignItems={'center'} flexDir={'column'}>
				<Text as={'h2'} fontSize={'3xl'}>
					{text}
				</Text>
				<RouterLink href={'/'}>
					<Button as={'a'}>Back to Homepage</Button>
				</RouterLink>
			</Flex>
		</Layout>
	)
}

export default Error
