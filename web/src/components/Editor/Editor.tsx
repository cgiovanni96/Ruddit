import * as React from 'react'
import ReactMde from 'react-mde'
import mdConverter from '../../lib/util/mdConverter'

interface EditorProps {
	value: string
	setValue: React.Dispatch<React.SetStateAction<string>>
}

const Editor: React.FC<EditorProps> = ({ value, setValue }) => {
	const [selectedTab, setSelectedTab] = React.useState<'write' | 'preview'>(
		'write'
	)

	return (
		<ReactMde
			value={value}
			onChange={setValue}
			selectedTab={selectedTab}
			onTabChange={setSelectedTab}
			generateMarkdownPreview={(markdown) =>
				Promise.resolve(mdConverter.makeHtml(markdown))
			}
		/>
	)
}

export default Editor
