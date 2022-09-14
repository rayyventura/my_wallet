import { Transaction } from '@prisma/client';
import { prisma } from '../../lib/prisma';

async function insert(data: Omit<Transaction, 'id'>) {
  console.log(data, '');
  await prisma?.transaction.create({
    data,
  });
}
async function findAll(id: number) {
  return await prisma?.transaction.findMany({
    where: {
      userId: id,
    },
  });
}

async function deleteItem(id: number) {
  return await prisma?.transaction.delete({
    where: {
      id,
    },
  });
}

export { insert, findAll, deleteItem };
