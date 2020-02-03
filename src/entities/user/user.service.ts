import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupInput } from './input/signup-input';
import { UserRepository } from './user.repository';
import { ErrorResponce } from './shared/errorResponse';

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

      await this.userRepository.save({ ...signupInput });
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
}
