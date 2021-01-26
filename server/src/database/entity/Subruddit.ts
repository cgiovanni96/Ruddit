import { Field, ObjectType } from 'type-graphql'
import {
	BaseEntity,
	BeforeInsert,
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm'
import Post from './Post'
import User from './User'

@Entity()
@ObjectType()
export default class Subruddit extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	@Field()
	id: string

	@Column()
	@Field()
	name: string

	@Column()
	@Field()
	description: string

	@Column({ unique: true })
	@Field()
	slug: string

	@Column()
	@Field()
	adminId: string

	@ManyToOne(() => User, (user) => user.id)
	@Field()
	admin: User

	@OneToMany(() => Post, (post) => post.subrudditId)
	posts: Post[]

	@CreateDateColumn()
	@Field()
	createdAt: string

	@UpdateDateColumn()
	@Field()
	updatedAt: string

	@BeforeInsert()
	lowerCaseSlug() {
		this.slug = this.slug.toLowerCase()
	}
}
