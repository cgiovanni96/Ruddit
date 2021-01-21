import { createConnection } from 'typeorm'
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import cors from 'cors'

import session, { redis } from './redis'
import build from '../schema/build'
import Context from './context'
import { loaders } from './loaders'

export default async (emitSchema: boolean = false, PORT: string) => {
	void createConnection()

	const app = express()
	app.use(
		cors({
			credentials: true,
			origin: 'http://localhost:3000'
		})
	)
	app.use(session)

	const server = new ApolloServer({
		schema: await build(emitSchema),
		context: ({ req, res }): Context => ({
			req,
			res,
			redis,
			loaders
		})
	})

	server.applyMiddleware({ app, cors: false })

	app.listen({ port: PORT }, () => {
		console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`)
	})
}
