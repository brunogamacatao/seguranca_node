const fs = require('fs');
const Mustache = require('mustache');

const carregaTemplate = (template, dados) => {
  return new Promise((resolve, reject) => {
    let templateFname = `${process.cwd()}/templates/${template}`;

    fs.readFile(templateFname, 'utf8', (err, data) => {
      if (err) {
        console.error('Erro ao ler o template: ', err);
        reject(err);
      } else {
        resolve(Mustache.render(data, dados));
      }
    });
  }); 
};

module.exports = {
  carregaTemplate
};