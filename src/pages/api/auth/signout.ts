// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { signout, signup } from '../../../services/users';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const token = req.body;
  await signout(token.token);
  res.status(201).send({ message: 'User succesfully created' });
}
