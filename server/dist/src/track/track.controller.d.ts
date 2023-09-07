/// <reference types="multer" />
import { Types } from 'mongoose';
import { createTrackDto } from './dto/create-track.dto';
import { TrackService } from './track.service';
import { CreateCommentDto } from './dto/create-comment.dto';
export declare class TrackController {
    private TrackService;
    constructor(TrackService: TrackService);
    create(files: {
        picture: Express.Multer.File;
        audio: Express.Multer.File;
    }, dto: createTrackDto): Promise<import("./schemas/track.schema").Track>;
    delete(id: Types.ObjectId): Promise<Types.ObjectId>;
    getAll(count: number, offset: number): Promise<import("./schemas/track.schema").Track[]>;
    search(query: string): Promise<import("./schemas/track.schema").Track[]>;
    getByID(id: Types.ObjectId): Promise<import("./schemas/track.schema").Track>;
    addComment(dto: CreateCommentDto): Promise<import("./schemas/comment.schema").Comment>;
    listen(id: Types.ObjectId): Promise<import("./schemas/track.schema").Track>;
}
