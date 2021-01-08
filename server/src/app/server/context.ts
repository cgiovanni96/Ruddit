import { Request, Response } from 'express'
import { Redis } from 'ioredis'

type Session = {
	userId?: string | undefined
}

type Context = {
	req: Request & { session: Session }
	res: Response
	redis: Redis
}

export default Context
