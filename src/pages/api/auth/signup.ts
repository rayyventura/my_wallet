// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { signup } from '../../../services/users';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const data = req.body;

  const response = await signup(data);

  if (response.type === 'conflict') {
    res.status(409).send(response.message);
  } else {
    res.status(201).send(response);
  }
}
