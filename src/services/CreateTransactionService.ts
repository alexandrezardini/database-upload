import { getRepository } from 'typeorm';
// import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import Category from '../models/Category';

interface InserteCategoryId {
  id: string;
}

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
  category_id: InserteCategoryId;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: Request): Promise<Transaction | null> {
    const transactionRepository = getRepository(Transaction);

    const categoryRepository = getRepository(Category);

    const checkCategoryExists = await categoryRepository.findOne({
      where: { title: category },
    });

    if (checkCategoryExists) {
      return null;
    }

    const InserteCategoryId = categoryRepository.create({
      title: category,
    });

    await categoryRepository.save(InserteCategoryId);

    const category_id = InserteCategoryId.id;

    // return category;

    const transaction = transactionRepository.create({
      title,
      value,
      type,
      category_id,
    });

    await transactionRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
