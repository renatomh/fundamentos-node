import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  // Função com a regra de negócio para a criação de transações
  public execute({ title, value, type }: Request): Transaction {
    // Verificando se o tipo passado é válido
    if (!["income", "outcome"].includes(type))
      throw new Error("Transaction type is not valid");

    // Pegando somente o total do saldo
    const { total } = this.transactionsRepository.getBalance();

    // Verificamos se há saldo suficiente no caso de uma saída (outcome)
    if (type == "outcome" && total < value)
      throw new Error("You do not have enough balance");

    // Criando a transa~çao caso os dados sejam válidos
    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    // Retornando a transação criada
    return transaction;
  }
}

export default CreateTransactionService;
