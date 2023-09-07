import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';

import { FileModule } from './file/file.module';
import { TrackModule } from './track/track.module';

const mongoDbUrl = 'mongodb+srv://admin:admin@cluster0.zez3iwi.mongodb.net/?retryWrites=true&w=majority';

// decorator. used like wrapper that add additional functionality to objects
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, 'static'),
    }),
    MongooseModule.forRoot(mongoDbUrl),
    FileModule,
    TrackModule,
  ],
})
export class AppModule {}
