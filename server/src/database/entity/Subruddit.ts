import { Field, ObjectType } from 'type-graphql'
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm'
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

	@CreateDateColumn()
	@Field()
	createdAt: string

	@Column()
	@Field()
	adminId: string

	@ManyToOne(() => User)
	@Field()
	admin: User

	@UpdateDateColumn()
	@Field()
	updatedAt: string
}
