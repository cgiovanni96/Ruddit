import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import Layout from '../../components/Layout'
import TextMd from '../../components/TextMd'
import { useSubrudditQuery } from '../../generated/graphql'
import useGetId from '../../lib/hook/useGetId'

const Sub: React.FC = ({}) => {
	const id = useGetId()
	const { loading, error, data } = useSubrudditQuery({ variables: { id } })

	if (loading) {
		return <div> Loading... </div>
	}
	if (error || !data || !data.subruddit) {
		return <div>Error...</div>
	}

	return (
		<Layout>
			<Box mt={6} p={8} bgColor={'gray.900'} rounded={'lg'}>
				<Flex flexDir={'column'}>
					<Heading as={'h2'}>{data.subruddit.name}</Heading>
					<Box>
						<Text>
							<TextMd text={data.subruddit.description} />
						</Text>
					</Box>
				</Flex>
			</Box>
		</Layout>
	)
}

export default Sub
