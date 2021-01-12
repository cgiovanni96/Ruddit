import { createWithApollo } from './createWithApollo.js'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { NextPageContext } from 'next'
import { PaginatedPostsResponse } from '../../generated/graphql'

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
		cache: new InMemoryCache({
			typePolicies: {
				Query: {
					fields: {
						posts: {
							keyArgs: [],
							merge(
								existing: PaginatedPostsResponse | undefined,
								incoming: PaginatedPostsResponse
							): PaginatedPostsResponse {
								return {
									...incoming,
									posts: [...(existing?.posts || []), ...incoming.posts]
								}
							}
						}
					}
				}
			}
		})
	})

export const withApollo = createWithApollo(createClient)
