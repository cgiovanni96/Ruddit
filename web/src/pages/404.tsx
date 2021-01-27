import React from 'react'
import { withApollo } from '../lib/apollo/withApollo'
import Error from '../components/Error'

const PageNotFound: React.FC = ({}) => {
	return <Error text={'404 | PAGE NOT FOUND'} />
}

export default withApollo({ ssr: false })(PageNotFound)
