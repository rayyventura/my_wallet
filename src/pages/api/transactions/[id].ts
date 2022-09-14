// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dayjs from 'dayjs';
import type { NextApiRequest, NextApiResponse } from 'next';
import { deleteItem } from '../../../services/transaction';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'DELETE') {
    try {
      const { id } = req.query;
      await deleteItem(Number(id));
      res.status(200).send({ message: 'Deleted successfully' });
    } catch (error: any) {
      res
        .status(500)
        .send({ message: 'Register was not succesfully inserted' });
    }
  } else if (req.method === 'PUT') {
    res.status(200).send({ message: '' });
  }
}
