import { ColorModeScript } from '@chakra-ui/react'
import NextDocument, { Head, Html, Main, NextScript } from 'next/document'

export default class Document extends NextDocument {
	render(): JSX.Element {
		return (
			<Html>
				<Head />
				<body>
					<ColorModeScript initialColorMode="light" />
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}
