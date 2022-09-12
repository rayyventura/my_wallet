import { UserData } from '../services/users';
import { prisma } from '../../lib/prisma';
import bcrypt from 'bcrypt';

async function signup(data: UserData) {
  const hashedPassword = bcrypt.hashSync(data.password, 10);
  await prisma.user.create({
    data: { name: data.name, email: data.email, password: hashedPassword },
  });
}

async function findByEmail(email: string) {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  return user;
}
async function signout(token: string) {
  await prisma.session.deleteMany({
    where: {
      token,
    },
  });
}
export { signup, findByEmail, signout };
