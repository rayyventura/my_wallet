// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dayjs from 'dayjs';
import type { NextApiRequest, NextApiResponse } from 'next';
import { validateToken } from '../../../lib/validatetokenMiddleware';
import { findAll, insert } from '../../services/transaction';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = req.headers?.authorization?.replace('Bearer ', '');

  if (req.method === 'POST' && token) {
    try {
      const data = req.body;
      const result = await validateToken(token);
      await insert({
        ...data,
        date: dayjs(Date.now()).format('DD/MM'),
        userId: result?.id,
      });
      res.status(201).send({ message: 'Income successfully created' });
    } catch (error: any) {
      console.log(error);
      res
        .status(500)
        .send({ message: 'Register was not succesfully inserted' });
    }
  } else if (req.method === 'GET' && token) {
    try {
      const result = await validateToken(token);
      if (result?.id) {
        const transactions = await findAll(result?.id);

        return res.status(200).send(transactions);
      }
    } catch (error: any) {
      if (error.type === 'unauthorized') {
        return res.status(401).send({ message: 'Invalid credentials' });
      }
      return res.status(500).send({ message: 'Error to fetch data' });
    }
  }
}
