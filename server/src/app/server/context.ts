import { Request, Response } from 'express'
import { Redis } from 'ioredis'
import DataLoader from 'dataloader'
import User from '../../database/entity/User'

type Session = {
	userId?: string | undefined
}

type Loaders = {
	authorLoader: DataLoader<string, User, string>
}

type Context = {
	req: Request & { session: Session }
	res: Response
	redis: Redis
	loaders: Loaders
}

export default Context
