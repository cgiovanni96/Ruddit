import { Connection } from 'typeorm'
import { Factory, Seeder } from 'typeorm-seeding'
import Post from '../entity/Post'
import Subruddit from '../entity/Subruddit'
import User from '../entity/User'

export default class PostSeeder implements Seeder {
	public async run(factory: Factory, connection: Connection): Promise<void> {
		const authors: User[] = await connection.getRepository(User).find()
		const authorsIds: string[] = authors.map((author) => {
			return author.id
		})

		const subruddits: Subruddit[] = await connection
			.getRepository(Subruddit)
			.find()
		const subrudditsIds: string[] = subruddits.map((sub) => {
			return sub.id
		})

		await factory(Post)({ authorsIds, subrudditsIds }).createMany(100)
	}
}
