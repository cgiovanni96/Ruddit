import {
	BaseEntity,
	BeforeInsert,
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm'
import { Field, ObjectType } from 'type-graphql'
import argon2 from 'argon2'
import Post from './Post'
import Vote from './Vote'

@Entity()
@ObjectType()
export default class User extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	@Field()
	id!: string

	@Column({ unique: true })
	@Field()
	name!: string

	@Column()
	password!: string

	@Column({ unique: true })
	@Field()
	email: string

	@OneToMany(() => Post, (post) => post.author)
	posts: Post[]

	@OneToMany(() => Vote, (vote) => vote.user)
	votes: Vote

	@CreateDateColumn()
	@Field()
	createdAt: Date

	@UpdateDateColumn()
	@Field()
	updatedAt: Date

	@BeforeInsert()
	async hashPassword() {
		this.password = await argon2.hash(this.password)
	}
}
