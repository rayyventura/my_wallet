// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { signin } from '../../../services/users';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const data = req.body;
  const loginData = await signin(data);
  if (loginData.type === 'unauthorized') {
    return res.status(401).send(loginData.message);
  }
  res.status(201).send(loginData);
}
