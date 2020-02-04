import { v4 } from 'uuid';
import { redis } from '../redis';
import { CONFIRM_EMAIL_PREFIX } from '../constants';
import { configService } from '../config/config.service';

export const confirmEmailLink = async (userId: string): Promise<string> => {
  const id = v4();

  await redis.set(`${CONFIRM_EMAIL_PREFIX}_${id}`, userId, 'ex', 60 * 60 * 15);

  return `http://localhost:${configService.getPort()}/user/confirm/${id}`;
};
