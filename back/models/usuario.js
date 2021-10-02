const mongoose        = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Email           = require('mongoose-type-email');
const { encripta }    = require('../services/seguranca-service');
const { geraToken }   = require('../services/validacao-service');

const usuarioSchema = new mongoose.Schema({
  email:              {type: Email,   required: true, unique: true},
  senha:              {type: String,  required: true},
  validado:           {type: Boolean, default:  false},
  token_validacao:    {type: String,  default:  geraToken()},
  data_geracao_token: {type: Date,    default:  Date.now},
  roles:              [{type: String, enum: ['admin', 'user']}]
}, { 
  timestamps: true 
});

// Adicionando um pre-save hook (função chamada antes de salvar)
usuarioSchema.pre('save', function (next) {
  let usuario = this;

  // se a senha for modificada --> encripta antes de salvar no banco
  if (usuario.isModified('senha')) {
    encripta(usuario.senha).then(senhaEncriptada => {
      usuario.senha = senhaEncriptada;
      next();
    });
  }
});

usuarioSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Usuario', usuarioSchema);
