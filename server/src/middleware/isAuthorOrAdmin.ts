import Context from '../app/server/context'
import { MiddlewareFn } from 'type-graphql'
import Post from '../database/entity/Post'

const isAuthorOrAdmin: MiddlewareFn<Context> = async (
	{ args, context },
	next
) => {
	const postToUpdate = await Post.findOne(args.id, { relations: ['subruddit'] })
	if (!postToUpdate) return undefined
	const isAdmin =
		postToUpdate.subruddit.adminId === context.req.session.userId ? true : false
	const isAuthor =
		postToUpdate.authorId === context.req.session.userId ? true : false
	if (isAdmin || isAuthor) return next()
	else throw new Error('Not authorized')
	return next()
}

export default isAuthorOrAdmin
