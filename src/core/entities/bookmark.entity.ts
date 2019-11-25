import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Offer } from './offer.entity';
import { Profile } from './profile.entity';

@Entity()
export class Bookmark extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(type => Offer, offer => offer.bookmarks, { eager: false })
  offer: Offer;

  @Column()
  offerId: number;

  @ManyToOne(type => Profile, profile => profile.bookmarks, { eager: false })
  profile: Profile;

  @Column()
  profileId: number;
}
