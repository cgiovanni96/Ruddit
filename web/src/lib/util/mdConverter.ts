import * as Showdown from 'showdown'

const mdConverter = new Showdown.Converter({
	tables: true,
	simplifiedAutoLink: true,
	strikethrough: true,
	tasklists: true
})

export default mdConverter
