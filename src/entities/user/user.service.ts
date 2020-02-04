import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupInput } from './input/signup-input';
import { UserRepository } from './user.repository';
import { ErrorResponce } from './shared/errorResponse';
import { sendEmail } from '../../utils/sendEmail';
import { confirmEmailLink } from '../../utils/confimEmailLink';
import { redis } from '../../redis';
import { Response } from 'express';
import { CONFIRM_EMAIL_PREFIX } from '../../constants';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async signup(signupInput: SignupInput): Promise<ErrorResponce[] | null> {
    try {
      const userExit = await this.userRepository.findOne({
        where: {
          email: signupInput.email,
        },
      });
      if (userExit) {
        return [
          {
            path: 'email',
            message: 'invalid email or password',
          },
        ];
      }

      const user = await this.userRepository.save({ ...signupInput });
      await sendEmail(signupInput.email, await confirmEmailLink(user.id));
      return null;
    } catch (e) {
      return [
        {
          path: 'error',
          message: e,
        },
      ];
    }
  }

  async confirmEmail(id: string, res: Response) {
    try {
      const userId = await redis.get(`${CONFIRM_EMAIL_PREFIX}_${id}`);
      if (!userId) {
        throw new NotFoundException();
      }
      await this.userRepository.update({ id: userId }, { confirmed: true });
      res.send('ok');
    } catch (e) {
      throw new NotFoundException();
    }
  }
}
