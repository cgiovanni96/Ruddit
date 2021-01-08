import { GraphQLSchema } from 'graphql'
import { buildSchema } from 'type-graphql'
import path from 'path'

import resolvers from './resolvers'

const schemaPath = path.join(__dirname, 'schema.graphql')

export default async (emitSchema = false): Promise<GraphQLSchema> => {
	const emitSchemaFile = emitSchema ? schemaPath : false

	return await buildSchema({
		resolvers,
		emitSchemaFile
	})
}
