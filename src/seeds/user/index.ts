import { getRepository } from 'typeorm';
import { User } from '../../entities/user/user.entity';

export const seedUsers = async () => {
  try {
    const users: User[] = [
      {
        userName: 'Gena',
        email: 'gendos@gmail.com',
        password: '1',
        confirmed: true,
      },
      {
        userName: 'Vanya',
        email: 'vanya@gmail.com',
        password: '2',
        confirmed: true,
      },
    ].map((el: User) => {
      const user = new User();
      user.userName = el.userName;
      user.email = el.email;
      user.password = el.password;
      user.confirmed = el.confirmed;
      return user;
    });
    const usersRepo = getRepository(User);
    await usersRepo.insert(users);
  } catch (e) {
    // tslint:disable-next-line:no-console
    console.error(e);
  }
};
