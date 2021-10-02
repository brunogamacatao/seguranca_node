const mongoose = require('mongoose');

// Conexão com o banco de dados
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

const db = mongoose.connection;

const conectar = () => {
  return new Promise((resolve, reject) => {
    db.on('error', (error) => {
      reject(error);
    });
  
    db.once('open', () => {
      resolve();
    });  
  });
};

module.exports = {
  conectar
};
