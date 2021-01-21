import React from 'react'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'

interface TextMdProps {
	text: string
	snippet?: boolean
}

const TextMd: React.FC<TextMdProps> = ({ text, snippet }) => {
	const textToRender = `${text}${snippet ? '&hellip;' : ''}`
	return (
		<ReactMarkdown plugins={[gfm]} skipHtml>
			{textToRender}
		</ReactMarkdown>
	)
}

export default TextMd
