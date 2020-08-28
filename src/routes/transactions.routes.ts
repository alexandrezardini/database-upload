import { getCustomRepository, getRepository } from 'typeorm';
import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import ensureIsValidId from '../middlewares/ensureIsValidId';
import DeleteTransactionService from '../services/DeleteTransactionService';
// import ImportTransactionsService from '../services/ImportTransactionsService';

const transactionsRouter = Router();

transactionsRouter.get('/', async (request, response) => {
  const transactionsRepository = getCustomRepository(TransactionsRepository);
  const balancerepository = new TransactionsRepository();

  const balance = await balancerepository.getBalance();

  const transactions = await transactionsRepository.all();
  response.json({ transactions, balance });
});

transactionsRouter.post('/', async (request, response) => {
  const { title, value, type, category } = request.body;

  const createTransaction = new CreateTransactionService();

  const transaction = await createTransaction.execute({
    title,
    value,
    type,
    category,
  });

  response.json(transaction);
});

transactionsRouter.delete(
  '/:id',
  ensureIsValidId,
  async (request, response) => {
    const { id } = request.params;
    const deleteTransaction = new DeleteTransactionService();

    await deleteTransaction.execute(id);

    return response.status(204).send();
  },
);

transactionsRouter.post('/import', async (request, response) => {});

export default transactionsRouter;
