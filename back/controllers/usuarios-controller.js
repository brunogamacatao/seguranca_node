const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario');
const ValidacaoService = require('../services/validacao-service');

// Retorna todos os usuários
router.get('/', async (req, res) => {
  res.json(await Usuario.find({}));
});

// Cadastra um usuário
router.post('/', async (req, res) => {
  try {
    const novo = await new Usuario(req.body).save();
    ValidacaoService.enviaEmailValidacao(novo);
    res.status(201).json(novo);
  } catch (e) {
    res.status(500).json(e);
  }
});

// Valida um usuário
router.get('/validar/:id/:token', findPorId, async (req, res) => {
  try {
    ValidacaoService.validaTokenCadastro(req.usuario, req.params.token);

    req.usuario.validado = true;
    req.usuario.save();

    res.status(200).json({
      message: 'Usuário validado com sucesso.'
    });
  } catch (erro) { 
    // Se o token expirou, envia um novo email de validação
    if (erro.tipo === ValidacaoService.TOKEN_EXPIRADO) {
      // Gera um novo token
      req.usuario.token_validacao = ValidacaoService.geraToken();
      req.usuario.data_geracao_token = Date.now;
      // Envia um outro email de validação
      ValidacaoService.enviaEmailValidacao(req.usuario);
    }

    res.status(404).json({ 
      message: erro.mensagem
    });
  }
});

router.get('/validar/:id/:token', findPorId, async (req, res) => {
  try {
    ValidacaoService.validaTokenCadastro(req.usuario, req.params.token);

    req.usuario.validado = true;
    req.usuario.save();

    res.status(200).json({
      message: 'Usuário validado com sucesso.'
    });
  } catch (erro) {
    res.status(404).json({ 
      message: erro
    });
  }
});

// função de middleware para recuperar um usuario pelo id
async function findPorId(req, res, next) {
  try {
    req.usuario = await Usuario.findById(req.params.id);
    
    if (req.usuario === null) {
      return res.status(404).json({ 
        message: 'Nao foi possivel encontrar um usuário com o id informado'
      });
    }
  } catch(err) {
    return res.status(500).json({ message: err.message });
  }

  next();
};

module.exports = router;