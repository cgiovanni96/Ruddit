import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm'
import { Field, ObjectType } from 'type-graphql'
import User from './User'
import Post from './Post'

@Entity()
@ObjectType()
export default class Comment extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	@Field()
	id: string

	@Column()
	@Field()
	userId: string

	@ManyToOne(() => User, (user) => user.votes)
	@Field(() => User)
	user: User

	@Column()
	@Field()
	postId: string

	@ManyToOne(() => Post, (post) => post.votes, { onDelete: 'CASCADE' })
	@Field(() => Post)
	post: Post

	@Column('text')
	@Field()
	text: string

	@CreateDateColumn()
	@Field()
	createdAt: Date

	@UpdateDateColumn()
	@Field()
	updatedAt: Date
}
