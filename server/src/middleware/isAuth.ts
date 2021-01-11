import Context from '../app/server/context'
import { AuthChecker } from 'type-graphql'

const isAuth: AuthChecker<Context> = ({ context }) => {
	if (!context.req.session.userId) return false
	return true
}

export default isAuth
