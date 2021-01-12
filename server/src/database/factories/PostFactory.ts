import { define } from 'typeorm-seeding'
import * as Faker from 'faker'
import Post from '../entity/Post'
import log from '../../app/util/log'
import userId from '../userId'
import randomDate from '../../app/util/randomDate'

define(Post, (faker: typeof Faker) => {
	const title = faker.lorem.sentence()
	const text = faker.lorem.paragraphs(2)

	// console.log(userIds)
	const post = new Post()
	post.title = title
	post.text = text
	post.authorId = userId
	post.createdAt = randomDate(new Date(2020, 0, 1), new Date())

	log(
		'post',
		`post: \n${post.title},\ntext: ${post.text},\nauthorId: ${post.authorId},\n\n`
	)

	return post
})
