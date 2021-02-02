import voteLoader from '../loader/voteLoader'
import userLoader from '../loader/userLoader'
import subrudditLoader from '../loader/subrudditLoader'
import commentByPostIdsLoader from '../loader/commentByPostIdsLoader'

export type Loaders = {
	userLoader: ReturnType<typeof userLoader>
	voteLoader: ReturnType<typeof voteLoader>
	subrudditLoader: ReturnType<typeof subrudditLoader>
	commentByPostIdsLoader: ReturnType<typeof commentByPostIdsLoader>
}

export const loaders: Loaders = {
	userLoader: userLoader(),
	voteLoader: voteLoader(),
	subrudditLoader: subrudditLoader(),
	commentByPostIdsLoader: commentByPostIdsLoader()
}

export default Loaders
