import { Query, Resolver } from 'type-graphql'

@Resolver()
export default class BaseResolver {
	@Query()
	hello(): string {
		return 'Hello world'
	}
}
