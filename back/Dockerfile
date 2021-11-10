FROM node:14.18-alpine

WORKDIR /app
# Copio o package.json => ele é quem tem as dependências
COPY package.json .
# Instalo as dependências
RUN npm install
# Copio o restante dos arquivos
COPY . .

# Valores padrão para as variáveis de ambiente da aplicação
# Podem ser alteradas durante a execução do container
ENV DATABASE_URL=MUDE_ESSE_VALOR
ENV BACKEND_PUBLIC_URL=http://localhost:5000
ENV SERVER_PORT=5000
ENV SALT_ROUNDS=5
ENV SECRET=S3crEt0!
ENV TEMPO_TOKEN_VALIDACAO_EXPIRA=1800000
ENV EMAIL_HOST=MUDE_ESSE_VALOR
ENV EMAIL_PORT=25
ENV EMAIL_USER=apikey
ENV EMAIL_PASSWORD=MUDE_ESSE_VALOR
ENV EMAIL_SENDER=MUDE_ESSE_VALOR
ENV EMAIL_ADMIN=admin@email.com
ENV SENHA_ADMIN=senha123

EXPOSE 5000

# A variável de ambiente DATABASE_URL deve ser passada na execução do container
CMD npm start