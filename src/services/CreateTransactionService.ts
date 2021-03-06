import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string,
  value: number,
  type: string
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title, value, type}: Request): Transaction {

    if(type !== 'income' && type !== 'outcome'){
      throw new Error('Invalid type. Must be "income" or "outcome"')
    }

    const balance = this.transactionsRepository.getBalance();
    if(type == 'outcome' && balance.total < value){
      throw new Error('Insuficcient amount');
    }

    return this.transactionsRepository.create(title, value, type);
  }
}

export default CreateTransactionService;
