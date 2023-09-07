import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import config from 'config';

import { FILE_TYPE, FileService } from '../file/file.service';

import { createTrackDto } from './dto/create-track.dto';
import { Track, TrackDocument } from './schemas/track.schema';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    private fileService: FileService,
  ) {}

  async create(
    dto: createTrackDto,
    audio: Express.Multer.File,
    picture: Express.Multer.File,
  ): Promise<Track> {
    const audioPath = this.fileService.createFile(FILE_TYPE.AUDIO, audio);
    const picturePath = this.fileService.createFile(FILE_TYPE.IMAGE, picture);
    const track = await this.trackModel.create({
      ...dto,
      audio: audioPath,
      listens: 0,
      picture: picturePath,
    });

    return track;
  }

  async addComment(dto: CreateCommentDto): Promise<Comment> {
    const track = await this.trackModel.findById(dto.trackId);
    const comment = await this.commentModel.create(dto);

    track.comments.push(comment._id);
    await track.save();

    return comment;
  }

  async delete(id: Types.ObjectId): Promise<Types.ObjectId> {
    const track = await this.trackModel.findByIdAndDelete(id);

    this.fileService.removeFile(track.audio, FILE_TYPE.AUDIO);
    this.fileService.removeFile(track.picture, FILE_TYPE.IMAGE);

    return track._id;
  }

  async getAll(count = config.itemsPerPage, offset = 0): Promise<Track[]> {
    const tracks = await this.trackModel.find().skip(offset).limit(count);
    return tracks;
  }

  async getByID(id: Types.ObjectId): Promise<Track> {
    const track = await this.trackModel.findById(id).populate('comments');
    return track;
  }

  async listen(id: Types.ObjectId): Promise<Track> {
    const track = await this.trackModel.findById(id);

    track.listens++;
    track.save();

    return track;
  }

  async search(query: string): Promise<Track[]> {
    const tracks = await this.trackModel.find({
      title: { $regex: new RegExp(query, 'i') }, // flag "i" makes search without register (no difference between A and a)
    });
    return tracks;
  }
}
