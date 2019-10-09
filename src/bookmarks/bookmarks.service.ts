import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../auth/user.entity';
import { Bookmark } from './bookmark.entity';
import { BookmarkRepository } from './bookmark.repository';

@Injectable()
export class BookmarksService {
  constructor(
    @InjectRepository(BookmarkRepository)
    private bookmarkRepository: BookmarkRepository,
  ) {}

  async getBookmarks(
    user: User,
  ): Promise<Bookmark[]> {
    return this.bookmarkRepository.getBookmarks(user);
  }
}
