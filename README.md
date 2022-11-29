# App de Transferência Bancárias com Express Node.JS

Está aplicação foi realizada com o intuito de aprender e desenvolver habilidades com o Express
e também como requisito para a seleção técnica da TryBe.

## Instalação

### Pré requisitos

Possuir docker e docker-compose. Ou então possuir o node, postgres e yarn instalado.

### Docker

A aplicação possui imagens dockeres. Então para se utilizar dela:

1º Crie um arquivo .env baseado ao env.example tanto do repositorio do backend como frontend

2º Rode o comando:

    docker-compose up -d

### YARN

A parte backend da aplicação foi realizada com o gerenciador YARN, então recomenda-se que se utilize dele.

1º Crie um banco de dados postgres, para receber o banco da aplicação

2º Crie um arquivo .env baseado ao env.example

3º Coloque as credencias do banco recém criado, no qual segue a seguinte ordem 

    "postgresql://{username}:{password}@{host}:{port}/{name_db}?schema=public"

#### YARN

4º Rode o comando para instalar as dependencias:

    yarn install

5º Rode o comando para realizar a migração do banco de dados:

    yarn prisma generate

6º Rode o comando para inicializar o servidor:

    yarn dev
    
## Por onde começar?

Para começar a utilizar a API é necessário criar um usuário, através da rota:
    
    http://{local_configurado}:{porta}/user

Que para isso, deve ser enviado um *POST* com o objeto JSON:
    
    { 
        "username": "teste"
        "password": "12345678aA"
    }

Logo apos, esse passo, é necessário realizar o login do usuário na aplicação, para gerar o token. Para isso é necessário enviar um *POST*, para a rota:

    http://{local_configurado}:{porta}/login

Com o JSON:
    
    { 
        "username": "teste"
        "password": "12345678aA"
    }
 
## Checando rotas

Para acessar a rota de saldo do cliente é necessário estar "logado" no sistema, e com isso enviar o token JWT na requisição *GET* na rota
    
    http://{local_configurado}:{porta}/user/balance

Para o conseguir transferir o saldo que desejar é necessário estar "logado" no sistema, e com isso enviar o token JWT na requisição *POST* na rota

    http://{local_configurado}:{porta}/user/transfer
    
Com o objeto JSON
    
    {
	    "receiverUserUsername": "Gabriel",
	    "value": 1.0
    }
    
E por fim, para checar as transações é necessário o usuário estar "logado" no sistema  e com isso enviar o token JWT na requisição *GET* na rota:
    
    http://{local_configurado}:{porta}/user/transactions/?transactionCashIn=false&transactionCashOut=false&date=
