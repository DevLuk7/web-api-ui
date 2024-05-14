import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NewsletterModule } from './newsletter/newsletter.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    PostsModule,
    NewsletterModule,
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      appName: 'Blog',
      dbName: process.env.MONGODB_DB_NAME,
    }),
  ],
})
export class AppModule {}
