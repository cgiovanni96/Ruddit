import { GraphQLSchema } from 'graphql'
import { buildSchema } from 'type-graphql'

import resolvers from './resolvers'

export default async (emitSchema = false): Promise<GraphQLSchema> => {
	const emitSchemaFile = emitSchema ? './schema.graphql' : false

	return await buildSchema({
		resolvers,
		emitSchemaFile,
		validate: true
	})
}
