import { EntityRepository, Repository, getRepository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    // const transactionRepository = [getRepository(Transaction)];

    // const transactions = [transactionRepository];

    // const transactionsBalance = transactions.reduce(
    //   (acc: Balance, cur: Transaction) => {
    //     switch (cur.type) {
    //       case 'income':
    //         acc.income += cur.value;
    //         break;
    //       case 'outcome':
    //         acc.outcome += cur.value;
    //         break;
    //       default:
    //         break;
    //     }
    //     return acc;
    //   },
    //   {
    //     income: 0,
    //     outcome: 0,
    //     total: 0,
    //   },
    // );

    // return transactionsBalance
  }
}

export default TransactionsRepository;
