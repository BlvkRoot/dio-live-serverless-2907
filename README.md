<!--
title: 'AWS Simple HTTP Endpoint example in NodeJS'
description: 'This template demonstrates how to make a simple REST API with Node.js running on AWS Lambda and API Gateway using the traditional Serverless Framework.'
layout: Doc
framework: v2
platform: AWS
language: nodeJS
authorLink: 'https://github.com/serverless'
authorName: 'Serverless, inc.'
authorAvatar: 'https://avatars1.githubusercontent.com/u/13742415?s=200&v=4'
-->

# API Node.js com Serverless Framework em ambiente AWS

Este repositório contém o código fonte do Live Coding da DIO no dia 29/07/2021. Neste projeto vamos criar uma infraestrutra em nuvem AWS com API Gateway, DynamoDB, AWS Lambda e AWS CloudFormation utilizando o framework Serverless para o desenvolvimento baseada em Infraestrutura as a Code.

## Etapas

Pré requisitos: 
 - possuir uma conta na AWS e instalar Node.js na máquina.
 - Instalar o AWS CLI: https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html

### Setup Inicial

#### Credenciais AWS

- Criar usuário: AWS Management Console -> IAM Dashboard -> Create New User -> <nome do usuário> -> Permissions "Administrator Access" -> Programmatic Access -> Dowload Keys
- No terminal: ```$ aws configure``` -> colar as credenciais geradas anteriormente
- 
#### Configurar o framework Serverless
```$ npm i -g serverless```

### Desenvolvimento do projeto
 
```
$ serverless
Login/Register: No
Update: No
Type: Node.js REST API
Name: dio-live
```
```
$ cd dio-live
$ code .
``` 
- No arquivo ```serverless.yml``` adicionar a região ```region: us-west-2``` dentro do escopo de ```provider:```
- Salvar e realizar o deploy ```$ serverless deploy -v```

#### Estruturar o código

- Criar o diretório "src" e mover o arquivo "index.js" para dentro dele
- Renomear o arquivo "index.js" para "index.mjs"
- Atualizar o código 
```
export const handler = async (event) => {}
/////
```
- Atualizar o arquivo "serverless.yml "
```
handler: src/index.handler
```
```$ serverless deploy -v ```

#### DynamoDB
Atualizar o arquivo serverless.yml
```
resources:
  Resources:
    ItemTable:
      Type: AWS::DynamoDB::Table
      Properties:
          TableName: ItemTable
          BillingMode: PAY_PER_REQUEST
          AttributeDefinitions:
            - AttributeName: id
              AttributeType: S
          KeySchema:
            - AttributeName: id
              KeyType: HASH
```
#### Desenvolver funções lambda

	- Pasta /src do repositório
 	- Obter arn da tabela no DynamoDB AWS Console -> DynamoDB -> Overview -> Amazon Resource Name (ARN)
	- Atualizar arquivo serverless.yml com o código a seguir, abaixo do ```region:```
  ```
	iam:
      role:
          statements:
            - Effect: Allow
              Action:
                - dynamodb:PutItem
                - dynamodb:UpdateItem
                - dynamodb:GetItem
                - dynamodb:Scan
              Resource:
                - arn:aws:dynamodb:us-west-2:763237336453:table/itemsTable
  ```
  
   - Instalar dependências

   ```npm init```
   ```npm i uuid aws-sdk```
   
  - Atualizar lista de funções no arquivo serverless.yml
  ```
  functions:
  home:
    handler: src/index.handler
    events:
      - http:
          path: /
          method: get
  insertItem:
    handler: src/functions/create.handler
    events:
      - http:
          path: /item
          method: post
  listItem:
    handler: src/functions/list.handler
    events:
      - http:
          path: /items
          method: get
  showItem:
    handler: src/functions/show.handler
    events:
      - http:
          path: /items/{id}
          method: get
  updateItem:
    handler: src/functions/update.handler
    events:
      - http:
          path: /items/{id}
          method: put
  ```


