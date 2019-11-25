import {
  BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Unique,
} from 'typeorm';

import { EntityStatus } from '../../common/enums/entity-status.enum';
import { Profile } from '../profiles/profile.entity';
import { Shop } from '../shops/shop.entity';
import { UserRole } from './user.enum';

import * as bcrypt from 'bcrypt';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  password: string;

  @Column({
    type: 'varchar',
    length: 100,
    unique: true,
  })
  email: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CLIENT,
  })
  roles: UserRole;

  @Column({
    type: 'enum',
    enum: EntityStatus,
    default: EntityStatus.INACTIVE,
  })
  status: EntityStatus;

  @Column()
  salt: string;

  @OneToOne(type => Profile, {eager: false})
  @JoinColumn()
  profile: Profile;

  @OneToOne(type => Shop, {eager: false})
  @JoinColumn()
  shop: Shop;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);

    return hash === this.password;
  }
}
