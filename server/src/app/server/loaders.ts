import voteLoader from '../loader/voteLoader'
import userLoader from '../loader/userLoader'
import subrudditLoader from '../loader/subrudditLoader'
import commentLoader, { CommentLoader } from '../loader/commentLoader'

export type Loaders = {
	userLoader: ReturnType<typeof userLoader>
	voteLoader: ReturnType<typeof voteLoader>
	subrudditLoader: ReturnType<typeof subrudditLoader>
	commentLoader: CommentLoader
}

export const loaders: Loaders = {
	userLoader: userLoader(),
	voteLoader: voteLoader(),
	subrudditLoader: subrudditLoader(),
	commentLoader: commentLoader
}

export default Loaders
