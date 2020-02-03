import { seedUsers } from './user/index';

export const seed = async () => {
  await seedUsers();
};
