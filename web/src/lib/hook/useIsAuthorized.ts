import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useMeQuery } from '../../generated/graphql'

const useIsAuthorized = () => {
	const { data, loading } = useMeQuery()
	const router = useRouter()

	useEffect(() => {
		if (!loading && !data?.me) router.replace('/login?next=' + router.pathname)
	}, [loading, data, router])
}

export default useIsAuthorized
