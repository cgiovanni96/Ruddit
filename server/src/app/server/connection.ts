import { createConnection } from 'typeorm'
import { ApolloServer } from 'apollo-server-express'
import express from 'express'

import session from './redis'
import build from '../schema/build'
import Context from './context'

export default async (emitSchema: boolean = false, PORT: string) => {
	void createConnection()

	const app = express()

	app.use(session)

	const server = new ApolloServer({
		schema: await build(emitSchema),
		context: ({ req, res }): Context => ({ req, res })
	})

	server.applyMiddleware({ app })

	app.listen({ port: PORT }, () => {
		console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`)
	})
}
