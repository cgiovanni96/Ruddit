import { Factory, Seeder } from 'typeorm-seeding'
import Post from '../entity/Post'

export default class PostSeeder implements Seeder {
	public async run(factory: Factory): Promise<void> {
		await factory(Post)().createMany(100)
	}
}
