import { Flex, Spinner } from '@chakra-ui/react'
import React from 'react'
import Layout from './Layout'

const Loading: React.FC = ({}) => {
	return (
		<Layout>
			<Flex justifyContent={'center'}>
				<Spinner
					thickness={'8px'}
					speed={'0.55s'}
					emptyColor={'gray.700'}
					color={'blue.500'}
					size={'xl'}
				/>
			</Flex>
		</Layout>
	)
}

export default Loading
