/// <reference types="multer" />
import { Model, Types } from 'mongoose';
import { FileService } from '../file/file.service';
import { createTrackDto } from './dto/create-track.dto';
import { Track, TrackDocument } from './schemas/track.schema';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { CreateCommentDto } from './dto/create-comment.dto';
export declare class TrackService {
    private commentModel;
    private trackModel;
    private fileService;
    constructor(commentModel: Model<CommentDocument>, trackModel: Model<TrackDocument>, fileService: FileService);
    create(dto: createTrackDto, audio: Express.Multer.File, picture: Express.Multer.File): Promise<Track>;
    addComment(dto: CreateCommentDto): Promise<Comment>;
    delete(id: Types.ObjectId): Promise<Types.ObjectId>;
    getAll(count?: number, offset?: number): Promise<Track[]>;
    getByID(id: Types.ObjectId): Promise<Track>;
    listen(id: Types.ObjectId): Promise<Track>;
    search(query: string): Promise<Track[]>;
}
