import { Connection } from 'typeorm'
import { Factory, Seeder } from 'typeorm-seeding'
import Subruddit from '../entity/Subruddit'
import User from '../entity/User'

export default class SubrudditSeeder implements Seeder {
	public async run(factory: Factory, connection: Connection): Promise<void> {
		const admins: User[] = await connection.getRepository(User).find()
		const adminsIds: string[] = admins.map((admin) => {
			return admin.id
		})

		console.log('Seeder Ids: ', adminsIds)

		await factory(Subruddit)({ adminsIds: adminsIds }).createMany(5)
	}
}
