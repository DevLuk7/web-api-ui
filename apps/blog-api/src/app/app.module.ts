import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { NewsletterModule } from './newsletter/newsletter.module';
import { PostsModule } from './posts/posts.module';
import { getSSMParameters } from './smm-parameters';

@Module({
  imports: [
    PostsModule,
    NewsletterModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        async () => {
          return getSSMParameters([
            'OPEN_AI_SECRET_KEY',
            'AUTH_ISSUER_BASE_URL',
            'AUTH_AUDIENCE',
            'AUTH_CLIENT_ORIGIN_URL',
          ]);
        },
      ],
    }),
    MongooseModule.forRootAsync({
      useFactory: async () => {
        const parameters = await getSSMParameters(['MONGODB_URI', 'MONGODB_DB_NAME']);

        if (!parameters['MONGODB_URI']) {
          throw new Error('Database URI is not defined');
        }

        return {
          uri: parameters['MONGODB_URI'],
          dbName: parameters['MONGODB_DB_NAME'],
          appName: 'Blog',
        };
      },
    }),
  ],
})
export class AppModule {}
