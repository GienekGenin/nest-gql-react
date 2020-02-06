import 'reflect-metadata';
import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as logger from 'morgan';
import * as cors from 'cors';
import * as session from 'express-session';
import { configService } from '../../config/config.service';
import * as Store from 'connect-redis';
import { redis } from '../../redis';

export const applyMiddleware = (app: INestApplication) => {
  const RedisStore = Store(session);

  app.use(
    session({
      name: 'voutingapp',
      secret: configService.getValue('SESSION_SECRET'),
      resave: true,
      saveUninitialized: false,
      store: new RedisStore({
        client: redis,
      }),
      cookie: {
        httpOnly: true,
        secure: configService.getValue('NODE_ENV') === 'production',
        maxAge: 1000 * 60 * 60,
      },
    }),
  );

  const options = new DocumentBuilder()
    .setTitle('App API docs')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('tag')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.use(
    cors(),
    helmet(),
    logger('dev'),
    bodyParser.json({ limit: 50000000, type: 'application/json' }),
    bodyParser.urlencoded({ extended: true }),
    bodyParser.text(),
  );
};
