import { BaseEntity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Entity } from 'typeorm/decorator/entity/Entity';

import { Profile } from '../profiles/profile.entity';
import { Shop } from '../shops/shop.entity';

@Entity()
export class Purchase extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column()
  date: Date;

  @OneToMany(type => Profile, profile => profile.city, { eager: false } )
  profile: Profile[];

  @Column()
  profileId: number;

  @OneToMany(type => Shop, shop => shop.city, { eager: false } )
  shop: Shop[];

  @Column()
  shopId: number;
}
