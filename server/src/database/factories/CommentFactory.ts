import { define } from 'typeorm-seeding'
import * as Faker from 'faker'
import log from '../../app/util/log'
import randomDate from '../../app/util/randomDate'
import randomUserId from './util/randomUserId'
import randomSubId from './util/randomSubId'
import Comment from '../entity/Comment'

define(Comment, (
	faker: typeof Faker,
	context?: { authorsIds: string[]; postsIds: string[] }
) => {
	const text = faker.lorem.paragraphs(2)

	const comment = new Comment()
	comment.text = text
	comment.userId = randomUserId(context?.authorsIds)
	comment.postId = randomSubId(context?.postsIds)
	comment.createdAt = randomDate(new Date(2020, 0, 1), new Date())

	log(
		'comment',
		`text: \n${comment.text},\nuserId: ${comment.userId},\npostId: ${comment.postId},\n\n`
	)

	return comment
})
