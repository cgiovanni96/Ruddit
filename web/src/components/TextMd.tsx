import React from 'react'
import ReactMarkdown from 'react-markdown'

interface TextMdProps {
	text: string
	snippet?: boolean
}

const TextMd: React.FC<TextMdProps> = ({ text, snippet }) => {
	const textToRender = `${text}${snippet ? '&hellip;' : ''}`
	return <ReactMarkdown>{textToRender}</ReactMarkdown>
}

export default TextMd
