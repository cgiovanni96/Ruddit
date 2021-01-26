import { useRouter } from 'next/router'

const useGetSlug = (): string => {
	const router = useRouter()
	const slug: string =
		typeof router.query.slug === 'string' ? router.query.slug : ''
	return slug
}

export default useGetSlug
