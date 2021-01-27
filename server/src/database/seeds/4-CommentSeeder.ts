import { Connection } from 'typeorm'
import { Factory, Seeder } from 'typeorm-seeding'
import Comment from '../entity/Comment'
import Post from '../entity/Post'
import User from '../entity/User'

export default class CommentSeeder implements Seeder {
	public async run(factory: Factory, connection: Connection): Promise<void> {
		const authors: User[] = await connection.getRepository(User).find()
		const authorsIds: string[] = authors.map((author) => {
			return author.id
		})

		const posts: Post[] = await connection.getRepository(Post).find()
		const postsIds: string[] = posts.map((post) => {
			return post.id
		})

		await factory(Comment)({ authorsIds, postsIds }).createMany(100)
	}
}
