const express = require('express');
const router = express.Router();
const { isAutenticado, podeAcessar } = require('../services/seguranca-service');

const produtos = [
  {id: 0, nome: 'Copo', valor: 20.0},
  {id: 1, nome: 'Prato', valor: 50.0},
  {id: 2, nome: 'Mesa', valor: 300.0},
];

router.get('/', (req, res) => {
  res.json(produtos);
});

router.post('/', isAutenticado, (req, res) => {
  produtos.push(req.body);
  res.json(req.body);
});

router.delete('/', isAutenticado, podeAcessar(['ADMIN']), (req, res) => {
  res.json({msg: 'Deu certo'});
});


module.exports = router;
