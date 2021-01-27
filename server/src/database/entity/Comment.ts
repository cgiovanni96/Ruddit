import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryColumn,
	UpdateDateColumn
} from 'typeorm'
import { Field, ObjectType } from 'type-graphql'
import User from './User'
import Post from './Post'

@Entity()
@ObjectType()
export default class Comment extends BaseEntity {
	@PrimaryColumn()
	@Field()
	userId: string

	@ManyToOne(() => User, (user) => user.votes)
	@Field(() => User)
	user: User

	@PrimaryColumn()
	@Field()
	postId: string

	@ManyToOne(() => Post, (post) => post.votes, { onDelete: 'CASCADE' })
	@Field(() => Post)
	post: Post

	@Column('text')
	text: string

	@CreateDateColumn()
	@Field()
	createdAt: Date

	@UpdateDateColumn()
	@Field()
	updatedAt: Date
}
