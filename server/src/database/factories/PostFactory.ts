import { define } from 'typeorm-seeding'
import * as Faker from 'faker'
import Post from '../entity/Post'
import log from '../../app/util/log'

const userId = '31a20732-8591-4a66-b1f7-cfd56dcca3c9'

define(Post, (faker: typeof Faker) => {
	const title = faker.lorem.sentence()
	const text = faker.lorem.paragraphs(2)

	// console.log(userIds)
	const post = new Post()
	post.title = title
	post.text = text
	post.authorId = userId
	return post

	log(
		'post',
		`post: \n${post.title},\ntext: ${post.text},\nauthorId: ${post.authorId},\n\n`
	)

	return post
})
