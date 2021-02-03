import Context from '../app/server/context'
import { MiddlewareFn } from 'type-graphql'
import Comment from '../database/entity/Comment'
import Subruddit from '../database/entity/Subruddit'

const isCommentAuthorOrAdmin: MiddlewareFn<Context> = async (
	{ args, context },
	next
) => {
	console.log('Comment Middleware args ', args)
	const commentToUpdate = await Comment.findOne(args.id)
	if (!commentToUpdate) return undefined
	const currentSubruddit = await Subruddit.findOne(args.subrudditId)
	if (!currentSubruddit) return undefined
	const isAdmin =
		currentSubruddit.adminId === context.req.session.userId ? true : false
	const isAuthor =
		commentToUpdate.userId === context.req.session.userId ? true : false
	if (isAdmin || isAuthor) return next()
	else throw new Error('Not authorized')
	return next()
}

export default isCommentAuthorOrAdmin
