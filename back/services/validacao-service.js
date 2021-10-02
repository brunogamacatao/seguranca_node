const { v4: uuidv4 }  = require('uuid');
const EmailService    = require('./email-service');
const TemplateService = require('./template-service');

// Constantes
const TOKEN_EXPIRADO     = 'TOKEN_EXPIRADO';
const TOKEN_INVALIDO     = 'TOKEN_INVALIDO';
const TEMPO_TOKEN        = parseInt(process.env.TEMPO_TOKEN_VALIDACAO_EXPIRA);
const BACKEND_PUBLIC_URL = process.env.BACKEND_PUBLIC_URL;

const enviaEmailValidacao = (usuario) => {
  TemplateService.carregaTemplate('email_validacao.html', 
  {BACKEND_PUBLIC_URL, usuario}).then(emailHtml => {
    EmailService.enviar({
      para: usuario.email,
      assunto: 'Validação do Cadastro',
      html: emailHtml,
      attachments: [{
        filename: 'generic_logo.png',
        path: `${process.cwd()}/templates/images/generic_logo.png`,
        cid: 'logo_da_empresa'
      }]
    });
  });
};

const validaTokenCadastro = (usuario, token) => {
  if (usuario.token_validacao === token) {
    if (usuario.data_geracao_token + TEMPO_TOKEN > Date.now()) {
      throw {
        tipo: TOKEN_EXPIRADO,
        mensagem: 'O token expirou. Uma nova mensagem foi enviada para seu email.'
      };
    }
  } else {
    throw {
      tipo: TOKEN_INVALIDO,
      mensagem: 'Token inválido.'
    };
  }
};

const geraToken = () => {
  return uuidv4();
};

module.exports = {
  TOKEN_INVALIDO,
  TOKEN_EXPIRADO,
  enviaEmailValidacao,
  validaTokenCadastro,
  geraToken
};