import session from 'express-session'
import connectRedis from 'connect-redis'
import Redis from 'ioredis'
import { PROD } from '../../constants/server'

export const RedisStore = connectRedis(session)
export const redis = new Redis()

export const cookieAge = (): number => {
	return 1000 * 60 * 60 * 24 * 365 * 5 // 5 years
}

const rudditSession = session({
	name: 'sid',
	store: new RedisStore({ client: redis, disableTouch: true }),
	cookie: {
		maxAge: cookieAge(),
		httpOnly: true,
		sameSite: 'lax', // for csrf
		secure: PROD
	},
	resave: false,
	saveUninitialized: false,
	secret: process.env.SESSION_SECRET || ' '
})

export default rudditSession
