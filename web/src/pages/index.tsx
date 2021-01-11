import { Heading } from '@chakra-ui/react'
import Layout from '../components/Layout'
import { useGetPostsQuery } from '../generated/graphql'
import { withApollo } from '../lib/apollo/withApollo'

const Index: React.FC = () => {
	const { data, loading } = useGetPostsQuery()

	if (!loading && !data) {
		return <div>Something happened</div>
	}

	return (
		<Layout>
			<Heading as="h1" size="2xl">
				Hello!
			</Heading>
		</Layout>
	)
}

export default withApollo({ ssr: false })(Index)
