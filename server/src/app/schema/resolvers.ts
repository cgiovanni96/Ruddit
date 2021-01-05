import PostResolver from '../../resolver/post'
import { NonEmptyArray } from 'type-graphql'
import BaseResolver from '../../resolver/base'

// NonEmptyArray is the type accepted by type-graphql's BuildSchemaOptions for the resolvers array
// it could also be casted as a const, but this way is more consistent with the library.
export default [BaseResolver, PostResolver] as
	| NonEmptyArray<Function>
	| NonEmptyArray<string>
