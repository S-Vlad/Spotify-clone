// Controller used for interaction with requests and responses.
// for exempale: Receive a request from the user, handle it and send response back

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { Types } from 'mongoose';

import { createTrackDto } from './dto/create-track.dto';
import { TrackService } from './track.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('/tracks')
export class TrackController {
  constructor(private TrackService: TrackService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      {
        name: 'picture',
        maxCount: 1,
      },
      {
        name: 'audio',
        maxCount: 1,
      },
    ]),
  )
  create(
    @UploadedFiles() files: { picture: Express.Multer.File; audio: Express.Multer.File },
    @Body() dto: createTrackDto,
  ) {
    return this.TrackService.create(dto, files.audio[0], files.picture[0]);
  }

  @Delete(':id')
  delete(@Param('id') id: Types.ObjectId) {
    return this.TrackService.delete(id);
  }

  @Get()
  getAll(@Query('count') count: number, @Query('offset') offset: number) {
    return this.TrackService.getAll(count, offset);
  }

  @Get('/search')
  search(@Query('query') query: string) {
    return this.TrackService.search(query);
  }

  @Get(':id')
  getByID(@Param('id') id: Types.ObjectId) {
    return this.TrackService.getByID(id);
  }

  @Post('/comment')
  addComment(@Body() dto: CreateCommentDto) {
    return this.TrackService.addComment(dto);
  }

  @Post('/listen/:id')
  listen(@Param('id') id: Types.ObjectId) {
    return this.TrackService.listen(id);
  }
}
