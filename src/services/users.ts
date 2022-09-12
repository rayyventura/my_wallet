import * as userRepository from '../repositories/userData';
import { prisma } from '../../lib/prisma';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export interface UserData {
  name: string;
  email: string;
  password: string;
}
async function signup(data: UserData) {
  const existingUser = await userRepository.findByEmail(data.email);
  if (existingUser) {
    throw { type: 'error', message: 'user already exist' };
  }
  await userRepository.signup(data);
}

async function signin(data: Omit<UserData, 'id'>) {
  const existingUser = await userRepository.findByEmail(data.email);

  const secretJWT = process.env.JWT_SECRET;

  if (!existingUser || !secretJWT) {
    throw {
      type: 'error',
      message: 'unauthorized ',
    };
  } else {
    const comparePassword = bcrypt.compareSync(
      data.password,
      existingUser.password
    );
    if (comparePassword) {
      const token = jwt.sign({ userId: existingUser.id }, secretJWT);
      await prisma.session.create({
        data: {
          userId: existingUser.id,
          token,
        },
      });
      return { token, userName: existingUser.name };
    }
  }
}
async function signout(token: string) {
  const session = await prisma.session.findFirst({
    where: {
      token,
    },
  });
  if (!session) {
    return;
  }
  await userRepository.signout(token);
}
export { signup, signin, signout };
