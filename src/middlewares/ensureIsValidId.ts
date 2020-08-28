import { Request, Response, NextFunction } from 'express';
import { getCustomRepository } from 'typeorm';
import TransactionsRepository from '../repositories/TransactionsRepository';

export default async function ensureIsValidId(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { id } = request.params;

  const transactionsRepository = getCustomRepository(TransactionsRepository);

  const validTransaction = await transactionsRepository.findOne({
    where: { id },
  });

  if (!validTransaction) {
    return response.status(400).json({
      error: 'Transaction not found, please check the "id" Transaction!',
    });
  }

  return next();
}
