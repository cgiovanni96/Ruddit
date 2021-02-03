import { Ctx, FieldResolver, Resolver, Root } from 'type-graphql'
import Context from '../../app/server/context'
import User from '../../database/entity/User'

@Resolver(User)
export default class UserResolver {
	@FieldResolver(() => [Comment], { nullable: true })
	comments(@Root() user: User, @Ctx() { loaders }: Context) {
		return loaders.commentLoader.byUserIds.load(user.id)
	}
}
