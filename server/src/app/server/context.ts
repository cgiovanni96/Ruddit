import { Request, Response } from 'express'
import { Redis } from 'ioredis'
import voteLoader from '../loader/voteLoader'
import userLoader from '../loader/userLoader'

type Session = {
	userId?: string | undefined
}

type Loaders = {
	userLoader: ReturnType<typeof userLoader>
	voteLoader: ReturnType<typeof voteLoader>
}

type Context = {
	req: Request & { session: Session }
	res: Response
	redis: Redis
	loaders: Loaders
}

export default Context
