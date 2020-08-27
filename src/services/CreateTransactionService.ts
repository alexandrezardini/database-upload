import { getRepository, getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import Category from '../models/Category';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: Request): Promise<Transaction | null> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const categoryRepository = getRepository(Category);

    const { total } = await transactionsRepository.getBalance();

    if (!['income', 'outcome'].includes(type)) {
      throw new Error('Transaction type is invalid');
    }

    if (type === 'outcome' && total < value) {
      throw new AppError('You do not have enough balance', 400);
    }

    const checkCategoryExists = await categoryRepository.findOne({
      where: { title: category },
    });

    if (checkCategoryExists) {
      const categoryAll = await categoryRepository.find({
        where: { title: category },
      });

      const transaction = transactionsRepository.create({
        title,
        value,
        type,
        category_id: categoryAll[0].id,
      });

      await transactionsRepository.save(transaction);

      return transaction;
    }

    const InserteCategoryId = categoryRepository.create({
      title: category,
    });

    await categoryRepository.save(InserteCategoryId);

    const category_id = InserteCategoryId.id;
    const transaction = transactionsRepository.create({
      title,
      value,
      type,
      category_id,
    });

    await transactionsRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
