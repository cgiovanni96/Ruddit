import { define } from 'typeorm-seeding'
import * as Faker from 'faker'
import log from '../../app/util/log'
import Subruddit from '../entity/Subruddit'
import randomUserId from './util/randomUserId'

define(Subruddit, (faker: typeof Faker, context?: { adminsIds: string[] }) => {
	console.log(console.log(context))
	const name = faker.lorem.sentence(3, 6)
	const slug = faker.lorem.slug()
	const description = faker.lorem.paragraphs(3)

	const subruddit = new Subruddit()
	subruddit.name = name
	subruddit.description = description
	subruddit.slug = slug
	subruddit.adminId = randomUserId(context?.adminsIds)

	log(
		'subruddit',
		`subruddit: \n${subruddit.name},\ndescription: ${subruddit.description},\nadminId: ${subruddit.adminId},\n\n`
	)

	return subruddit
})
