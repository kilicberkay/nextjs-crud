import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    const { id } = req.body;
    await prisma.post.delete({ where: { id: Number(id) } });
    res.status(200).json({ message: 'Post Deleted' });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
