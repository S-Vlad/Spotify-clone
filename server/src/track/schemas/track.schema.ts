// Schemas are used to define Models.
// Models are responsible for creating and reading documents from the MongoDB database.

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type TrackDocument = HydratedDocument<Track>;

@Schema()
export class Track {
  @Prop()
  title: string;

  @Prop()
  artist: string;

  @Prop()
  lyrics: string;

  @Prop()
  listens: number;

  @Prop()
  picture: string;

  @Prop()
  audio: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Comment' }] })
  comments: Types.ObjectId[]; // TODO: check if the type is correct
}

export const TrackSchema = SchemaFactory.createForClass(Track);
