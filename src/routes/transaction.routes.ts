import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

// Rota para listas as transações salvas
transactionRouter.get('/', (request, response) => {
  try {
    // Listando todas as transações do repositório
    const transactions = transactionsRepository.all();
    // Pegando o saldo das transações
    const balance = transactionsRepository.getBalance();

    // Retornando os dados obtidos
    return response.json({
      transactions,
      balance
    });
  }
  // Caso ocorra algum erro
  catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

// Rota para inserir uma nova transação
transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body;

    // Criando o serviço de transação
    const createTransaction = new CreateTransactionService(
      transactionsRepository,
    );

    // Executando a função para criar a transação
    const transaction = createTransaction.execute({
      title,
      value,
      type
    });

    // Rettornando os daods obtdos
    return response.json(transaction);
  }
  // Caso ocorra algum erro
  catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
