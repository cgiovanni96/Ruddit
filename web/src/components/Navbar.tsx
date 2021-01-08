import React from 'react'
import { Button, Flex, Heading, Link, Spacer, Text } from '@chakra-ui/react'
import RouterLink from 'next/link'

import { useMeQuery, useLogoutMutation } from '../generated/graphql'
import { useApolloClient } from '@apollo/client'
// import isServer from '../lib/util/isServer'
// interface NavbarProps {}

const Navbar: React.FC = ({}) => {
	const { error, loading, data } = useMeQuery({
		// skip: isServer()
	})
	const [logout] = useLogoutMutation()
	const apolloClient = useApolloClient()

	let rightMenu

	if (loading) {
		return <div>Loading</div>
	} else if (error) {
		return <div>Error</div>
	} else if (!data?.me) {
		rightMenu = (
			<>
				<RouterLink href="/login">
					<Link>
						<Button
							variant={'solid'}
							bgColor={'blue.500'}
							colorScheme={'blue'}
							color={'white'}
							fontSize={'lg'}
						>
							Login
						</Button>
					</Link>
				</RouterLink>
				<RouterLink href="/register">
					<Link ml={4}>
						<Text fontSize={'lg'}>Register</Text>
					</Link>
				</RouterLink>
			</>
		)
	} else {
		console.log('Data: ', data)
		rightMenu = (
			<>
				<Text>{data.me?.name}</Text>
				<Button
					ml={4}
					p={2}
					variant={'link'}
					bgColor={'red.400'}
					onClick={() => {
						logout()
						apolloClient.resetStore()
					}}
				>
					Logout
				</Button>
			</>
		)
	}
	return (
		<Flex p={4} mb={4} boxShadow={'md'} alignItems={'center'}>
			<Heading as={'h1'} size={'lg'} color={'blue.800'}>
				RUDDIT
			</Heading>
			<Spacer />
			<Flex alignItems={'center'}>{rightMenu}</Flex>
		</Flex>
	)
}

export default Navbar
