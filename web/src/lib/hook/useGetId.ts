import { useRouter } from 'next/router'

const useGetId = (): string => {
	const router = useRouter()
	const id: string = typeof router.query.id === 'string' ? router.query.id : ''
	return id
}

export default useGetId
