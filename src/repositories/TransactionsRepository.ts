import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  // Função para retornan todas as transações
  public all(): Transaction[] {
    return this.transactions;
  }

  // Função para retornar o saldo das transações
  public getBalance(): Balance {
    // Calculando o total de entradas e saídas
    const { income, outcome } = this.transactions.reduce(
      (accumulator: Balance, transaction: Transaction) => {
        switch (transaction.type) {
          case "income":
            accumulator.income += transaction.value;
            break;
          case "outcome":
            accumulator.outcome += transaction.value;
            break;
          default: break;
        }
        return accumulator;
      },
      // Formatando os dados como o tipo do 'balance'
      {
        income: 0,
        outcome: 0,
        total: 0,
      });

    // Calculando o saldo total
    const total = income - outcome;

    // Retornando os dados obtidos
    return { income, outcome, total };
  }

  // Função para criar uma nova transação (com os dados já validados pelo serviço)
  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    // Criando a nova transação a partir do modelo
    const transaction = new Transaction({
      title,
      value,
      type
    });

    // Adicionando na lista de transações
    this.transactions.push(transaction);

    // Retornando a nova transação criada
    return transaction;
  }
}

export default TransactionsRepository;
