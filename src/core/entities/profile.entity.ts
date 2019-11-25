import {
  BaseEntity, Column, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn,
} from 'typeorm';
import { Entity } from 'typeorm/decorator/entity/Entity';

import { ProfileGender } from '../../common/enums/gender.enum';
import { Bookmark } from './bookmark.entity';
import { City } from './city.entity';
import { Purchase } from './purchase.entity';
import { User } from './user.entity';

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
