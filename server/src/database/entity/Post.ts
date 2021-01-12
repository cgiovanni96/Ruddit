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
import truncateString from '../../app/util/truncateString'

@Entity()
@ObjectType()
export default class Post extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	@Field()
	id!: string

	@Column()
	@Field()
	title!: string

	@Column('text')
	@Field()
	text!: string

	@Column('int', { default: 0 })
	@Field()
	points!: number

	@Column()
	@Field()
	authorId: string

	@ManyToOne(() => User, (user) => user.posts)
	@Field()
	author: User

	@Field(() => String)
	textSnippet(): string {
		return truncateString(this.text, 80, true)
	}

	@CreateDateColumn()
	@Field(() => String)
	createdAt: Date

	@UpdateDateColumn()
	@Field(() => String)
	updatedAt: Date
}
