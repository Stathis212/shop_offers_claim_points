import { InternalServerErrorException, Logger } from '@nestjs/common';

import { EntityRepository, Repository } from 'typeorm';

import { User } from '../auth/user.entity';
import { Bookmark } from './bookmark.entity';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';

@EntityRepository(Bookmark)
export class BookmarkRepository extends Repository<Bookmark> {
  private logger = new Logger('BookRepository');

  async getBookmarks(
    user: User,
  ): Promise<Bookmark[]> {
    const query = this.createQueryBuilder('bookmarks');

    query.where('bookmark.profileId = :profileId', { userId: user.profile.id });

    try {
      const bookmarks = await query.getMany();
      return bookmarks;
    } catch (error) {
      this.logger.error(`Failed to get bookmarks for user "${user.email}"`, error.stack);
      throw new InternalServerErrorException();
    }
  }

  async createBookmark(
    createBookmarkDto: CreateBookmarkDto,
    user: User,
  ): Promise<Bookmark> {
    const { offerId, profileId } = createBookmarkDto;
    // const query = this.createQueryBuilder('profiles');

    // query.where('profile.id = :profileId', { profileId });

    const bookmark = new Bookmark();
    bookmark.offerId = offerId;
    bookmark.profileId = profileId;

    try {
      await bookmark.save();
    } catch (error) {
      this.logger.error(`Failed to create task for user "${user.email}". Data: ${createBookmarkDto}`, error.stack);
      throw new InternalServerErrorException();
    }

    return bookmark;
  }

}
