import { InternalServerErrorException, Logger } from '@nestjs/common';

import { EntityRepository, Repository } from 'typeorm';

import { User } from '../auth/user.entity';
import { Bookmark } from './bookmark.entity';

@EntityRepository(Bookmark)
export class BookmarkRepository extends Repository<Bookmark> {
  private logger = new Logger('BookRepository');

  async getBookmarks(
    user: User,
  ): Promise<Bookmark[]> {
    const query = this.createQueryBuilder('bookmarks');

    query.where('bookmark.userId = :userId', { userId: user.id });

    try {
      const bookmarks = await query.getMany();
      return bookmarks;
    } catch (error) {
      this.logger.error(`Failed to get bookmarks for user "${user.username}"`, error.stack);
      throw new InternalServerErrorException();
    }
  }

}
