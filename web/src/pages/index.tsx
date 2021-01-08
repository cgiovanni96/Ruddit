import { Heading, Box } from '@chakra-ui/react'
import Navbar from '../components/Navbar'
import { useGetPostsQuery } from '../generated/graphql'
import { withApollo } from '../lib/apollo/withApollo'

const Index: React.FC = () => {
	const { data, loading } = useGetPostsQuery()

	if (!loading && !data) {
		return <div>Something happened</div>
	}

	return (
		<Box>
			<Navbar />
			<Heading as="h1" size="2xl">
				Hello!
			</Heading>
		</Box>
	)
}

export default withApollo({ ssr: false })(Index)
