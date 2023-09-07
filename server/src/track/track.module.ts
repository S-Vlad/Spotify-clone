import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FileService } from '../file/file.service';

import { Comment, CommentSchema } from './schemas/comment.schema';
import { Track, TrackSchema } from './schemas/track.schema';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';

@Module({
  controllers: [TrackController],
  imports: [
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    MongooseModule.forFeature([{ name: Track.name, schema: TrackSchema }]),
  ],
  providers: [FileService, TrackService],
})
export class TrackModule {}
