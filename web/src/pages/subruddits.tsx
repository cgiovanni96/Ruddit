import { Box, Flex, Heading, Spacer, Text } from '@chakra-ui/react'
import React, { Fragment } from 'react'
import Layout from '../components/Layout'
import { useSubrudditsQuery } from '../generated/graphql'
import { withApollo } from '../lib/apollo/withApollo'

const Subruddits: React.FC = ({}) => {
	const { loading, error, data } = useSubrudditsQuery()

	if (loading) {
		return <div> Loading </div>
	}

	if (error || !data || !data.subruddits) {
		return <div> Error... </div>
	}

	return (
		<Layout>
			{data.subruddits.map((sub) => {
				return (
					<Fragment key={sub.id}>
						<Box p={8} bgColor={'gray.900'} rounded={'lg'}>
							<Flex flexDir={'column'}>
								<Heading as={'h2'}>{sub.name}</Heading>
								<Box>
									<Text>
										<div>{sub.description}</div>
									</Text>
								</Box>
							</Flex>
						</Box>
						<Spacer mb={6} />
					</Fragment>
				)
			})}
		</Layout>
	)
}

export default withApollo({ ssr: false })(Subruddits)
