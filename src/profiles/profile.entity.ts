import {
  BaseEntity, Column, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn,
} from 'typeorm';
import { Entity } from 'typeorm/decorator/entity/Entity';

import { Bookmark } from '../bookmarks/bookmark.entity';
import { City } from '../cities/city.entity';
import { Purchase } from '../purchases/purchase.entity';
import { User } from '../users/user.entity';
import { ProfileGender } from './gender.enum';

@Entity()
export class Profile extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 30,
  })
  firstName: string;

  @Column({
    length: 30,
  })
  lastName: string;

  @Column('float')
  points: number;

  @Column()
  age: number;

  @Column()
  gender: ProfileGender;

  @ManyToOne(type => City, city => city.profile, { eager: true })
  city: City;

  @OneToOne(type => User)
  @JoinColumn()
  user: User;

  @Column()
  userId: number;

  @OneToMany(type => Bookmark, bookmark => bookmark.profile, { eager: true } )
  bookmarks: Bookmark[];

  @OneToMany(type => Purchase, purchase => purchase.profile, { eager: true } )
  purchases: Purchase[];
}
