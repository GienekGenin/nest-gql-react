import * as Redis from 'ioredis';
import { configService } from './config/config.service';

export const redis = new Redis({
  host:
    configService.getValue('CONTAINERIZED_DEV') === 'TRUE'
      ? 'redis'
      : 'localhost',
});
