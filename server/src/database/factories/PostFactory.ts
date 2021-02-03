import { define } from 'typeorm-seeding'
import * as Faker from 'faker'
import Post from '../entity/Post'
import log from '../../app/util/log'
import randomDate from '../../app/util/randomDate'
import randomUserId from './util/randomUserId'
import randomSubId from './util/randomSubId'

define(Post, (
	faker: typeof Faker,
	context?: { authorsIds: string[]; subrudditsIds: string[] }
) => {
	const title = faker.lorem.sentence()
	const text = faker.lorem.paragraphs(2)

	// console.log(userIds)
	const post = new Post()
	post.title = title
	post.text = text
	post.authorId = randomUserId(context?.authorsIds)
	post.subrudditId = randomSubId(context?.subrudditsIds)
	post.createdAt = randomDate(new Date(2020, 0, 1), new Date())

	log(
		'post',
		`post: \n${post.title},\ntext: ${post.text},\nauthorId: ${post.authorId},\n\n`
	)

	return post
})
