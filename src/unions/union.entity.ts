import {
  BaseEntity, Column, CreateDateColumn, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Entity } from 'typeorm/decorator/entity/Entity';

import { Shop } from '../shops/shop.entity';
import { User } from '../users/user.entity';

@Entity()
@Unique(['title'])
export class Union extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  contactPersonName: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @Column()
  url: string;

  @CreateDateColumn({type: 'date'})
  dateCreated: Date;

  @OneToOne(type => User, { onDelete: 'CASCADE', nullable: false})
  @JoinColumn()
  user: User;

  @Column()
  userId: number;

  @OneToMany(type => Shop, shop => shop.union )
  shops: Shop[];
}
