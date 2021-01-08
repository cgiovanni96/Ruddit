import { createWithApollo } from './createWithApollo.js'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { NextPageContext } from 'next'

const createClient = (ctx: NextPageContext) =>
	new ApolloClient({
		uri: 'http://localhost:8080/graphql',
		credentials: 'include',
		headers: {
			cookie:
				(typeof window === 'undefined'
					? ctx?.req?.headers.cookie
					: undefined) || ''
		},
		cache: new InMemoryCache({})
	})

export const withApollo = createWithApollo(createClient)
