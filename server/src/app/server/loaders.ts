import voteLoader from '../loader/voteLoader'
import userLoader from '../loader/userLoader'
import subrudditLoader from '../loader/subrudditLoader'

type Loaders = {
	userLoader: ReturnType<typeof userLoader>
	voteLoader: ReturnType<typeof voteLoader>
	subrudditLoader: ReturnType<typeof subrudditLoader>
}

export default Loaders
