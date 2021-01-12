import { define } from 'typeorm-seeding'
import * as Faker from 'faker'
import log from '../../app/util/log'
import User from '../entity/User'

define(User, (faker: typeof Faker) => {
	const name = faker.random.word()
	const email = faker.internet.email(name, '', 'gmail.com')
	const password = faker.internet.password()

	const user = new User()
	user.name = name
	user.password = password
	user.email = email

	log(
		'user',
		`user: \n${user.name},\nemail: ${user.email},\npassword: ${user.password},\n\n`
	)

	log('userIds', `"${user.name}": "${user.password}",\n`, 'js')

	return user
})
