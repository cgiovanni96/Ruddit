import { Heading, Box } from '@chakra-ui/react'
import { useGetPostsQuery } from '../generated/graphql'
import { withApollo } from '../lib/apollo/withApollo'

const Index: React.FC = () => {
	const { data, loading } = useGetPostsQuery()

	if (!loading && !data) {
		return <div>Something happened</div>
	}

	console.log(data)

	return (
		<Box>
			<Heading as="h1" size="2xl">
				Hello!
			</Heading>
		</Box>
	)
}

export default withApollo({ ssr: false })(Index)
