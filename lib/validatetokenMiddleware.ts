import { prisma } from '../lib/prisma';
export async function validateToken(token: string) {
  const session = await prisma.session.findFirst({
    where: {
      token,
    },
  });

  if (session) {
    const user = await prisma.user.findFirst({
      where: {
        id: session.userId,
      },
    });

    return user;
  } else {
    throw { type: 'unauthorized', message: 'Invalid Credentials' };
  }
}
