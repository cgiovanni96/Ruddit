import DataLoader from 'dataloader'
import Subruddit from '../../database/entity/Subruddit'

const subrudditLoader = () =>
	new DataLoader<string, Subruddit>(async (subrudditIds) => {
		const subruddits = await Subruddit.findByIds(subrudditIds as string[])
		const subrudditsArray: Record<string, Subruddit> = {}
		subruddits.forEach((s) => {
			subrudditsArray[s.id] = s
		})

		return subrudditIds.map((id) => subrudditsArray[id])
	})

export default subrudditLoader
