import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import Context from '../../app/server/context'
import Subruddit from '../../database/entity/Subruddit'
import CreateSubrudditInputType from './types/CreateSubrudditInputType'

@Resolver()
export default class SubrudditResolver {
	@Query(() => [Subruddit])
	async subruddits() {
		return Subruddit.find()
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
