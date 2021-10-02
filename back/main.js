// Lê os dados do arquivo .env
require('dotenv').config();

// Importa os frameworks
const express = require('express');
const cors = require('cors');

// Serviços utilizados na inicialização do sistema
const DatabaseService  = require('./services/database-service');
const BootstrapService = require('./services/bootstrap-service');

console.log('Conectando ao banco de dados...');
DatabaseService.conectar().then(async () => {
  console.log('Executando rotinas de inicialização ...');
  BootstrapService.boostrap();

  // Cria o servidor web
  const app = express();

  // Configura o middlewate do servidor web
  app.use(express.static('static')); // serve os arquivos que estão na pasta ./static
  app.use(cors()); // permite requisições CORS de qualquer host
  app.use(express.json()); // popula req.body

  // Configura os roteamentos
  app.use('/session',  require('./controllers/session-controller'));
  app.use('/produtos', require('./controllers/produtos-controller'));
  app.use('/usuarios', require('./controllers/usuarios-controller'));

  // Inicia o servidor
  const SERVER_PORT = parseInt(process.env.SERVER_PORT);

  console.log('Iniciando o servidor web...');
  app.listen(SERVER_PORT, () => {
    console.log(`Servidor rodando em http://localhost:${SERVER_PORT}`);
  });
});