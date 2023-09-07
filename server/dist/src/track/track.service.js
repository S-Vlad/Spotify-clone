"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const config_1 = require("../../config");
const file_service_1 = require("../file/file.service");
const track_schema_1 = require("./schemas/track.schema");
const comment_schema_1 = require("./schemas/comment.schema");
let TrackService = exports.TrackService = class TrackService {
    constructor(commentModel, trackModel, fileService) {
        this.commentModel = commentModel;
        this.trackModel = trackModel;
        this.fileService = fileService;
    }
    async create(dto, audio, picture) {
        const audioPath = this.fileService.createFile("audio", audio);
        const picturePath = this.fileService.createFile("image", picture);
        const track = await this.trackModel.create({
            ...dto,
            audio: audioPath,
            listens: 0,
            picture: picturePath,
        });
        return track;
    }
    async addComment(dto) {
        const track = await this.trackModel.findById(dto.trackId);
        const comment = await this.commentModel.create(dto);
        track.comments.push(comment._id);
        await track.save();
        return comment;
    }
    async delete(id) {
        const track = await this.trackModel.findByIdAndDelete(id);
        this.fileService.removeFile(track.audio, "audio");
        this.fileService.removeFile(track.picture, "image");
        return track._id;
    }
    async getAll(count = config_1.default.itemsPerPage, offset = 0) {
        const tracks = await this.trackModel.find().skip(offset).limit(count);
        return tracks;
    }
    async getByID(id) {
        const track = await this.trackModel.findById(id).populate('comments');
        return track;
    }
    async listen(id) {
        const track = await this.trackModel.findById(id);
        track.listens++;
        track.save();
        return track;
    }
    async search(query) {
        const tracks = await this.trackModel.find({
            title: { $regex: new RegExp(query, 'i') },
        });
        return tracks;
    }
};
exports.TrackService = TrackService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(comment_schema_1.Comment.name)),
    __param(1, (0, mongoose_1.InjectModel)(track_schema_1.Track.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        file_service_1.FileService])
], TrackService);
//# sourceMappingURL=track.service.js.map