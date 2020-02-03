import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as logger from 'morgan';
import * as cors from 'cors';

export const applyMiddleware = (app: INestApplication) => {
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
