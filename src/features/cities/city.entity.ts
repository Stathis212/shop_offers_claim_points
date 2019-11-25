import { BaseEntity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Entity } from 'typeorm/decorator/entity/Entity';

import { Profile } from '../profiles/profile.entity';
import { Shop } from '../shops/shop.entity';

@Entity()
export class City extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 50 })
  name: string;

  @OneToMany(type => Profile, profile => profile.city, { eager: false } )
  profile: Profile[];

  @OneToMany(type => Shop, shop => shop.city, { eager: false } )
  shop: Shop[];
}
