import voteLoader from '../loader/voteLoader'
import userLoader from '../loader/userLoader'
import subrudditLoader from '../loader/subrudditLoader'

export type Loaders = {
	userLoader: ReturnType<typeof userLoader>
	voteLoader: ReturnType<typeof voteLoader>
	subrudditLoader: ReturnType<typeof subrudditLoader>
}

export const loaders: Loaders = {
	userLoader: userLoader(),
	voteLoader: voteLoader(),
	subrudditLoader: subrudditLoader()
}

export default Loaders
