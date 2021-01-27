import {
	Arg,
	Args,
	Authorized,
	Ctx,
	FieldResolver,
	Mutation,
	Query,
	Resolver,
	Root
} from 'type-graphql'
import { getConnection } from 'typeorm'
import Context from '../../app/server/context'
import Subruddit from '../../database/entity/Subruddit'
import PaginatedSubrudditsResponse from '../../database/schema/response/PaginatedSubrudditsResponse'
import CreateSubrudditInputType from './types/CreateSubrudditInputType'
import SubrudditPaginationArguments from './types/SubrudditPaginationArguments'

@Resolver(Subruddit)
export default class SubrudditResolver {
	@FieldResolver()
	admin(@Root() subruddit: Subruddit, @Ctx() { loaders }: Context) {
		return loaders.userLoader.load(subruddit.adminId)
	}

	@Query(() => PaginatedSubrudditsResponse)
	async subruddits(
		@Args() { cursor, limit }: SubrudditPaginationArguments
	): Promise<PaginatedSubrudditsResponse> {
		const setLimit = Math.min(50, limit)
		const limitPlusOne = limit + 1

		const cursorDate = cursor ? new Date(parseInt(cursor)) : null
		const qb = await getConnection()
			.getRepository(Subruddit)
			.createQueryBuilder('s')

		if (cursor) qb.where('s.createdAt < :cursorDate', { cursorDate })
		qb.orderBy('s.createdAt', 'DESC')
		qb.limit(limitPlusOne)
		const subruddits = await qb.getMany()

		return {
			subruddits: subruddits.slice(0, setLimit),
			hasMore: subruddits.length === limitPlusOne
		}
	}

	@Query(() => [Subruddit])
	async easySubruddits(): Promise<Subruddit[]> {
		return Subruddit.find()
	}

	@Query(() => Subruddit)
	async subruddit(@Arg('slug') slug: string) {
		const lowerCaseSlug = slug.toLowerCase()
		return Subruddit.findOne({ where: { slug: lowerCaseSlug } })
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
