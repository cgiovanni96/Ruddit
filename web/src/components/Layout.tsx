import React from 'react'
import Container from './Container'
import Navbar from './Navbar'

interface LayoutProps {
	variant?: 'small' | 'regular'
}

const Layout: React.FC<LayoutProps> = ({ children, variant }) => {
	return (
		<>
			<Navbar />
			<Container variant={variant}>{children}</Container>
		</>
	)
}

export default Layout
