import { Request, Response } from 'express'
import { Redis } from 'ioredis'
import { Loaders } from './loaders'

type Session = {
	userId?: string | undefined
}

type Context = {
	req: Request & { session: Session }
	res: Response
	redis: Redis
	loaders: Loaders
}

export default Context
