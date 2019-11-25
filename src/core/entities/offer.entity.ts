import {
  BaseEntity, Column, CreateDateColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm';
import { Entity } from 'typeorm/decorator/entity/Entity';

import { OfferStatus } from '../../common/enums/offer-status.enum';
import { Bookmark } from './bookmark.entity';
import { Category } from './category.entity';
import { Shop } from './shop.entity';

@Entity()
export class Offer extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 100 })
  name: string;

  @Column('text')
  description: string;

  @Column('date')
  dateFrom: Date;

  @Column('date')
  dateTo: Date;

  @Column('float')
  points: number;

  @Column({
    type: 'enum',
    enum: OfferStatus,
    default: OfferStatus.INACTIVE,
  })
  status: OfferStatus;

  @CreateDateColumn({type: 'date'})
  dateCreated: Date;

  @ManyToOne(type => Shop, shop => shop.offers, { eager: false })
  shop: Shop;

  @Column('int')
  shopId: number;

  @ManyToMany(() => Category, { eager: true })
  @JoinTable({ name: 'offer_categories' })
  categories: Category[];

  @ManyToMany(() => Bookmark, { eager: true })
  @JoinTable({ name: 'offer_bookmarks' })
  bookmarks: Bookmark[];
}
