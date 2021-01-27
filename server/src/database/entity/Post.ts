import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm'
import { Field, Int, ObjectType } from 'type-graphql'
import User from './User'
import truncateString from '../../app/util/truncateString'
import Vote from './Vote'
import Subruddit from './Subruddit'
import Comment from './Comment'

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

	@Field(() => Int, { nullable: true })
	voteStatus: number

	@Column()
	@Field()
	authorId: string

	@ManyToOne(() => User)
	@Field()
	author: User

	@Column()
	@Field()
	subrudditId: string

	@ManyToOne(() => Subruddit)
	@Field()
	subruddit: Subruddit

	@OneToMany(() => Vote, (vote) => vote.post)
	votes: Vote[]

	@OneToMany(() => Comment, (comment) => comment.post)
	comments: Comment[]

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
