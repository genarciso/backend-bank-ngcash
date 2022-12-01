# App de Transferência Bancárias com Express Node.JS e Prisma

Está aplicação foi realizada com o intuito de aprender e desenvolver habilidades com o Express e o Prisma
e também como requisito para a seleção técnica da TryBe.

## Instalação

### Pré requisitos

Possuir o node, postgres e yarn instalado.

### YARN

A parte backend da aplicação foi realizada com o gerenciador YARN, então recomenda-se que utilize-o.

1º Crie um banco de dados postgres, para receber o banco da aplicação

2º Crie um arquivo .env baseado ao env.example

3º Coloque as credencias do banco recém criado, no qual segue a seguinte ordem 

    "postgresql://{username}:{password}@{host}:{port}/{name_db}?schema=public"

#### YARN

4º Rode o comando para instalar as dependencias:

    yarn install

5º Rode o comando para realizar a migração e inicializar o servidor:

    yarn prod
    
## Por onde começar?

Para começar a utilizar a API é necessário utilizar algum cliente (ex.: Insomnia, Postman...)

1 - Para criar um usuário, através da rota:
    
    http://{local_configurado}:{porta}/user

Que para isso, deve ser enviado um *POST* com o objeto JSON:
    
    { 
        "username": "teste"
        "password": "12345678aA"
    }

2 - Para realizar o login do usuário na aplicação, para gerar o token. Para isso é necessário enviar um *POST*, para a rota:

    http://{local_configurado}:{porta}/login

Com o JSON:
    
    { 
        "username": "teste"
        "password": "12345678aA"
    }
 
## Checando rotas

3 - Para acessar a rota de saldo do cliente é necessário estar "logado" no sistema, e com isso enviar o token JWT na requisição *GET* na rota
    
    http://{local_configurado}:{porta}/user/balance

4 - Para o conseguir transferir o saldo que desejar é necessário estar "logado" no sistema, e com isso enviar o token JWT na requisição *POST* na rota

    http://{local_configurado}:{porta}/user/transfer
    
Com o objeto JSON
    
    {
	    "receiverUserUsername": "Gabriel",
	    "value": 1.0
    }
    
5 - Para checar as transações é necessário o usuário estar "logado" no sistema  e com isso enviar o token JWT na requisição *GET* na rota:
    
    http://{local_configurado}:{porta}/user/transactions/?transactionCashIn=false&transactionCashOut=false&date=
