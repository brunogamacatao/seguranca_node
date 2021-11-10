# Estágio de construção - builder
FROM node:14.18-alpine AS builder

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
ARG BACKEND_URL=http://192.168.1.12:7070
ENV REACT_APP_BACKEND_URL=$BACKEND_URL
RUN echo "BACKEND_URL = $BACKEND_URL"
RUN npm run build

# Durante a construção, o usuário deve informar a URL do backend
# docker build --build-arg BACKEND_URL=http://192.168.1.12:7070 ...

# Estágio de execução - server
FROM nginx AS server
COPY --from=builder /app/build /usr/share/nginx/html