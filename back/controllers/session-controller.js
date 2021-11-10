const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario');

const Seguranca = require('../services/seguranca-service');

router.post('/', async (req, res) => {
  let usuario = await Usuario.findOne({email: req.body.email});

  try {
    await Seguranca.validaLogin(usuario, req.body.senha);

    let token = Seguranca.criaToken(usuario);
    res.status(200).send({ auth: true, token, roles: usuario.roles });
  } catch (erro) {
    res.status(401).send({ auth: false, erro });
  }
});

module.exports = router;