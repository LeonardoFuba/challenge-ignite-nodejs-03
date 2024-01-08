<h1 align="center">Challenge Ignite Nodejs 03</h1>

<p align="center">
  <img alt="Github top language" src="https://img.shields.io/github/languages/top/leonardofuba/challenge-ignite-nodejs-03?color=56BEB8">
  <img alt="Repository size" src="https://img.shields.io/github/repo-size/leonardofuba/challenge-ignite-nodejs-03?color=56BEB8">
  <img alt="License" src="https://img.shields.io/github/license/leonardofuba/challenge-ignite-nodejs-03?color=56BEB8">
</p>
<br>

## 💻 Sobre o desafio ##

Nesse desafio desenvolveremos uma API para a adoção de animais, a FindAFriend API, utilizando SOLID e testes.

### Regras da aplicação

- Deve ser possível cadastrar um pet
- Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
- Deve ser possível filtrar pets por suas características
- Deve ser possível visualizar detalhes de um pet para adoção
- Deve ser possível se cadastrar como uma ORG
- Deve ser possível realizar login como uma ORG

### Regras de negócio

- Para listar os pets, obrigatoriamente precisamos informar a cidade
- Uma ORG precisa ter um endereço e um número de WhatsApp
- Um pet deve estar ligado a uma ORG
- O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
- Todos os filtros, além da cidade, são opcionais
- Para uma ORG acessar a aplicação como admin, ela precisa estar logada

## 🚀 Iniciando ##

```bash
# Clone o repositório
$ git clone https://github.com/leonardofuba/challenge-ignite-nodejs-03

# Acesse
$ cd challenge-ignite-nodejs-03

# Instale as dependências
$ npm install

# Estruture o banco
$ npx prisma migrate deploy

# Rode o servidor
$ npm run dev


```

## 🚨 Testes

```bash
# Rode o testes unitários
$ npm run test

# Rode os testes E2E
$ npm run test:e2e

# Confira a cobertura dos testes
$ npm run test:coverage

```

## 📝 Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.


Feito com :heart: por <a href="https://github.com/leonardofuba" target="_blank">Leonardo do Nascimento</a>
