import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './entities/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { PoolModule } from './entities/poll/poll.module';
import { PoolOptionsModule } from './entities/poll-option/poll-option.module';
import { pollOptionLoader } from './common/loaders/pollOptionLoader';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    GraphQLModule.forRoot({
      autoSchemaFile: '../../schema.gql',
      playground: configService.getValue('NODE_ENV') === 'development',
      context: ({ req, res }) => ({
        req,
        res,
        pollOptionLoader: pollOptionLoader(),
      }),
    }),
    UserModule,
    PoolModule,
    PoolOptionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
