// import { ApolloProvider } from '@apollo/client'
import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'
// import { useApollo } from '../lib/apollo/client'

import theme from '../theme'

function MyApp({ Component, pageProps }: any): JSX.Element {
	// const apolloClient = useApollo(pageProps.initialApolloState, ctx)
	return (
		// <ApolloProvider client={apolloClient}>
		<ChakraProvider resetCSS theme={theme}>
			<ColorModeProvider
				options={{
					useSystemColorMode: false,
					initialColorMode: 'light'
				}}
			>
				<Component {...pageProps} />
			</ColorModeProvider>
		</ChakraProvider>
		// </ApolloProvider>
	)
}

export default MyApp
