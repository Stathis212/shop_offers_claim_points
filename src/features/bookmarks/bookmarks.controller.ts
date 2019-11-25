import {
  Body, Controller, Get, Logger, Param, ParseIntPipe, Post, UseGuards, UsePipes, ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';

import { GetUser } from '../../common/decorators/get-user.decorator';
import { Bookmark } from '../../core/entities/bookmark.entity';
import { User } from '../../core/entities/user.entity';
import { BookmarksService } from './bookmarks.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';

@ApiUseTags('bookmarks')
@ApiBearerAuth()
@Controller('api/bookmarks')
@UseGuards(AuthGuard())
export class BookmarksController {
  private logger = new Logger('BookmarksController');

  constructor(private bookmarksService: BookmarksService) {}

  @Get()
  public getBookmarks(
    @GetUser() user: User,
  ): Promise<Bookmark[]> {
    this.logger.verbose(`User "${user.email}" retrieving all bookmarks.`);
    return this.bookmarksService.getBookmarks(user);
  }

  @Get(':id')
  public getTaskById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Bookmark> {
    return this.bookmarksService.getBookmarkById(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  public createTask(
    @Body() createBookmarkDto: CreateBookmarkDto,
    @GetUser() user: User,
  ): Promise<Bookmark> {
    this.logger.verbose(`User "${user.email}" creating new task. Data: ${JSON.stringify(createBookmarkDto)}`);
    return this.bookmarksService.createBookmark(createBookmarkDto, user);
  }

}
