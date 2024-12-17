import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { title, content } = req.body;
    const post = await prisma.post.create({ data: { title, content } });
    res.status(201).json(post);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
