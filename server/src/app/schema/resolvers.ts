import PostResolver from '../../resolver/post'
import { NonEmptyArray } from 'type-graphql'
import BaseResolver from '../../resolver/base'
import AuthResolver from '../../resolver/user/auth'

// NonEmptyArray is the type accepted by type-graphql's BuildSchemaOptions for the resolvers array
// it could also be casted as a const, but this way is more consistent with the library.
type ResolverArray = NonEmptyArray<Function> | NonEmptyArray<string>

export default [BaseResolver, PostResolver, AuthResolver] as ResolverArray
