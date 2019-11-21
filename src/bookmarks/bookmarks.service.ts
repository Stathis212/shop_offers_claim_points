import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../auth/user.entity';
import { Bookmark } from './bookmark.entity';
import { BookmarkRepository } from './bookmark.repository';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';

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

  async getBookmarkById(
    id: number,
    user: User,
  ): Promise<Bookmark> {
    const found = await this.bookmarkRepository.findOne({ where: { id, profileId: user.profile.id }});

    if (!found) {
      throw new NotFoundException('Bookmark was not found.');
    }

    return found;
  }

  async createBookmark(
    createTaskDto: CreateBookmarkDto,
    user: User,
  ): Promise<Bookmark> {
    return this.bookmarkRepository.createBookmark(createTaskDto, user);
  }
}
