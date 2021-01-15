import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'
import '../styles/css/react-mde-all.css'
import theme from '../theme'

function MyApp({ Component, pageProps }: any): JSX.Element {
	return (
		<ChakraProvider resetCSS theme={theme}>
			<ColorModeProvider
				options={{
					useSystemColorMode: false,
					initialColorMode: 'dark'
				}}
			>
				<Component {...pageProps} />
			</ColorModeProvider>
		</ChakraProvider>
	)
}

export default MyApp
