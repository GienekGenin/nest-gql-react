import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupInput, LoginInput } from './input';
import { UserRepository } from './user.repository';
import { ErrorResponce } from './shared/errorResponse';
import { sendEmail } from '../../utils/sendEmail';
import { confirmEmailLink } from '../../utils/confimEmailLink';
import { redis } from '../../redis';
import { Response, Request } from 'express';
import { CONFIRM_EMAIL_PREFIX } from '../../constants';
import * as bcrypt from 'bcryptjs';
import { MyContext } from '../../common/types/MyContext.types';

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

  async login(
    loginInput: LoginInput,
    req: Request,
  ): Promise<ErrorResponce[] | null> {
    const user = await this.userRepository.findOne({ email: loginInput.email });
    if (!user) {
      return [
        {
          path: 'error',
          message: 'User does not exist',
        },
      ];
    } else if (!user.confirmed) {
      return [
        {
          path: 'error',
          message: 'Confirm email',
        },
      ];
    }

    const checkPassword = await bcrypt.compare(
      loginInput.password,
      user.password,
    );
    if (!checkPassword) {
      return [
        {
          path: 'error',
          message: 'wrong pass',
        },
      ];
    }
    req.session.userId = user.id;
    return null;
  }

  async logout(ctx: MyContext) {
    await ctx.req.session.destroy((err: any) => {
      console.error(err);
      return false;
    });
    await ctx.res.clearCookie('voutingapp');
  }
}
