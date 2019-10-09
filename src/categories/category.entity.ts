import {
  BaseEntity, Column, PrimaryGeneratedColumn, Tree, TreeChildren, TreeLevelColumn, TreeParent,
} from 'typeorm';
import { Entity } from 'typeorm/decorator/entity/Entity';

@Entity()
@Tree('closure-table')
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 100 })
  name: string;

  @TreeChildren()
  children: Category[];

  @TreeParent()
  parent: Category;

  @TreeLevelColumn()
  level: number;
}
