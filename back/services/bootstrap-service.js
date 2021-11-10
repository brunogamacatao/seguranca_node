const Usuario   = require('../models/usuario');
const Seguranca = require('../services/seguranca-service');

const criar_usuario_administrador = () => {
  Usuario.count({}, async (err, count) => {
    // Se ainda não há usuários cadastrados
    if (count === 0) {
      // Criar o administrador
      await new Usuario({
        email: process.env.EMAIL_ADMIN,
        senha: process.env.SENHA_ADMIN,
        validado: true,
        roles: ['admin', 'user']
      }).save();

      console.log('Usuário administrador criado com sucesso');
    }
  });
};

const boostrap = () => {
  criar_usuario_administrador();
};

module.exports = {
  boostrap
};