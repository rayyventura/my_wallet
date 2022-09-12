// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { signin } from '../../../services/users';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const data = req.body;
  const loginData = await signin(data);
  res.status(201).send(loginData);
}
