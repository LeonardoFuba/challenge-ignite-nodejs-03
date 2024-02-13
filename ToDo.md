# App

FindAFriend API

## RFs (Requisitos funcionais)
_funcionalidades da aplicação (visão do usuário final)_

- [x] Deve ser possível cadastrar um pet;
- [x] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade;
- [x] Deve ser possível filtrar pets por suas características;
- [x] Deve ser possível visualizar detalhes de um pet para adoção;
- [x] Deve ser possível se cadastrar como uma ORG;
- [x] Deve ser possível realizar login como uma ORG;

## RNs (Regras de negócio)
_caminhos que cada requisito pode tomar (condições)_

- [x] Para listar os pets, obrigatoriamente precisamos informar a cidade;
- [x] Uma ORG precisa ter um endereço e um número de WhatsApp;
- [x] Um pet deve estar ligado a uma ORG;
- [] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp;
- [x] Todos os filtros, além da cidade, são opcionais;
- [] Para uma ORG acessar a aplicação como admin, ela precisa estar logada;

## RNFs (Requisitos não-funcionais)
_não partem do cliente (técnicos)_

- [x] A senha do usuário (ORG) precisa estar criptografada;
- [x] Os dados da aplicação precisa estar persistido em um banco PostgreSQL;
- [x] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [] O usuário deve ser identificado por um JWT (JSON Web Token);
- [] As imagens dos pets precisam ser acessíveis por uma url estática
