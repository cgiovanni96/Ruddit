import voteLoader from '../loader/voteLoader'
import userLoader from '../loader/userLoader'
import subrudditLoader from '../loader/subrudditLoader'
import commentByPostIdsLoader from '../loader/commentByPostIdsLoader'
import commentByUserIdsLoader from '../loader/commentByUserIdsLoader'

export type Loaders = {
	userLoader: ReturnType<typeof userLoader>
	voteLoader: ReturnType<typeof voteLoader>
	subrudditLoader: ReturnType<typeof subrudditLoader>
	commentByPostIdsLoader: ReturnType<typeof commentByPostIdsLoader>
	commentByUserIdsLoader: ReturnType<typeof commentByUserIdsLoader>
}

export const loaders: Loaders = {
	userLoader: userLoader(),
	voteLoader: voteLoader(),
	subrudditLoader: subrudditLoader(),
	commentByPostIdsLoader: commentByPostIdsLoader(),
	commentByUserIdsLoader: commentByUserIdsLoader()
}

export default Loaders
