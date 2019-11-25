import {
  BaseEntity, Column, CreateDateColumn, JoinColumn, ManyToOne, OneToMany, OneToOne,
  PrimaryGeneratedColumn, Unique,
} from 'typeorm';
import { Entity } from 'typeorm/decorator/entity/Entity';

import { City } from '../cities/city.entity';
import { Offer } from '../offers/offer.entity';
import { Purchase } from '../purchases/purchase.entity';
import { Union } from '../unions/union.entity';
import { User } from '../users/user.entity';
import { ShopStatus } from './shop-status.enum';

@Entity()
@Unique(['title'])
export class Shop extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  ownerFullName: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @Column()
  url: string;

  @Column()
  lat: number;

  @Column()
  lon: number;

  @Column()
  status: ShopStatus;

  @CreateDateColumn({type: 'date'})
  dateCreated: Date;

  @ManyToOne(type => City, city => city.shop, { eager: true })
  city: City;

  @OneToOne(type => User, { onDelete: 'CASCADE', nullable: false})
  @JoinColumn()
  user: User;

  @Column()
  userId: number;

  @OneToMany(type => Offer, offer => offer.shop, { eager: true } )
  offers: Offer[];

  @OneToMany(type => Purchase, purchase => purchase.shop, { eager: true } )
  sales: Purchase[];

  @ManyToOne(type => Union, union => union.shops )
  union: Union;
}
