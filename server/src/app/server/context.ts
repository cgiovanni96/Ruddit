import { Request, Response } from 'express'

type Session = {
	userId?: string | undefined
}

type Context = {
	req: Request & { session: Session }
	res: Response
}

export default Context
