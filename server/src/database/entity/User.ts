import {
	BaseEntity,
	BeforeInsert,
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm'
import { Field, ObjectType } from 'type-graphql'
import argon2 from 'argon2'

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
