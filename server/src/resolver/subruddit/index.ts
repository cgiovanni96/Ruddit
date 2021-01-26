import {
	Arg,
	Authorized,
	Ctx,
	FieldResolver,
	Mutation,
	Query,
	Resolver,
	Root
} from 'type-graphql'
import Context from '../../app/server/context'
import Subruddit from '../../database/entity/Subruddit'
import CreateSubrudditInputType from './types/CreateSubrudditInputType'

@Resolver(Subruddit)
export default class SubrudditResolver {
	@FieldResolver()
	admin(@Root() subruddit: Subruddit, @Ctx() { loaders }: Context) {
		return loaders.userLoader.load(subruddit.adminId)
	}

	@Query(() => [Subruddit])
	async subruddits() {
		return Subruddit.find()
	}

	@Query(() => Subruddit)
	async subruddit(@Arg('slug') slug: string) {
		return Subruddit.findOne({ where: { slug } })
	}

	@Mutation(() => Subruddit, { nullable: true })
	@Authorized()
	async createSubruddit(
		@Arg('data') createSubrudditData: CreateSubrudditInputType,
		@Ctx() { req }: Context
	): Promise<Subruddit | null> {
		const subruddit = await Subruddit.create({
			...createSubrudditData,
			adminId: req.session.userId
		})
		return subruddit.save()
	}
}
