import { Controller, Get, Logger, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { Bookmark } from './bookmark.entity';
import { BookmarksService } from './bookmarks.service';

@Controller('bookmarks')
@UseGuards(AuthGuard())
export class BookmarksController {
  private logger = new Logger('BookmarksController');

  constructor(private bookmarksService: BookmarksService) {}

  @Get()
  public getBookmarks(
    @GetUser() user: User,
  ): Promise<Bookmark[]> {
    this.logger.verbose(`User "${user.username}" retrieving all bookmarks.`);
    return this.bookmarksService.getBookmarks(user);
  }

}
