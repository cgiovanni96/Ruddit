import {
	Box,
	Button,
	Center,
	Flex,
	Heading,
	Stack,
	Text
} from '@chakra-ui/react'
import React from 'react'
import Layout from '../components/Layout'
import Loading from '../components/Loading'
import { useSubrudditsQuery } from '../generated/graphql'
import { withApollo } from '../lib/apollo/withApollo'

const Subruddits: React.FC = ({}) => {
	const { loading, error, data, fetchMore, variables } = useSubrudditsQuery({
		variables: { limit: 4, cursor: null }
	})

	if (loading) {
		return <Loading />
	}

	if (error || !data || !data.subruddits) {
		return <div> Error... </div>
	}

	const fetchMoreSubruddits = () => {
		fetchMore({
			variables: {
				limit: variables?.limit,
				cursor:
					data?.subruddits.subruddits[data.subruddits.subruddits.length - 1]
						.createdAt
			}
		})
	}

	return (
		<Layout>
			<Stack spacing={6}>
				{data?.subruddits.subruddits.map((s) => {
					return (
						<Box
							key={s.id}
							flex={1}
							mt={8}
							p={4}
							rounded={'lg'}
							bgColor={'gray.900'}
						>
							<Flex flexDir={'column'}>
								<Heading as={'h2'}>{s.name}</Heading>
								<Text>{s.description}</Text>
							</Flex>
						</Box>
					)
				})}
			</Stack>
			{data && data.subruddits.hasMore ? (
				<Center mt={4}>
					<Button
						onClick={fetchMoreSubruddits}
						isLoading={loading}
						bgColor={'blue.400'}
						colorScheme={'blue'}
					>
						More
					</Button>
				</Center>
			) : null}
		</Layout>
	)
}

export default withApollo({ ssr: true })(Subruddits)
