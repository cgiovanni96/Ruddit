import { Request, Response } from 'express'
import { Redis } from 'ioredis'
import voteLoader from '../loader/voteLoader'
import authorLoader from '../loader/authorLoader'

type Session = {
	userId?: string | undefined
}

type Loaders = {
	authorLoader: ReturnType<typeof authorLoader>
	voteLoader: ReturnType<typeof voteLoader>
}

type Context = {
	req: Request & { session: Session }
	res: Response
	redis: Redis
	loaders: Loaders
}

export default Context
