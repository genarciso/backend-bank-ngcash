# App de Transferência Bancárias com Express Node.JS

Está aplicação foi realizada com o intuito de aprender e desenvolver habilidades com o Express
e também como requisito para a seleção técnica da TryBe.

## Instalação

### Pré requisitos

    Possuir docker e docker-compose. Ou então possuir o node, postgres e yarn instalado.

### Docker

    A parte backend da aplicação possui uma imagem docker. Então para se utilizar dela:

    1º Crie um arquivo .env baseado ao env.example

    2º Rode o comando

    ``` docker-compose up -d ```

### YARN

    A parte backend da aplicação foi realizada com o gerenciador YARN, então recomenda-se que se utilize dele.

    1º Crie um banco de dados postgres, para receber o banco da aplicação

    2º Crie um arquivo .env baseado ao env.example

    3º Coloque as credencias do banco recém criado, no qual segue a seguinte ordem "postgresql://{username}:{password}@{host}:{port}/{name_db}?schema=public"

#### YARN

    4º Rode o comando para instalar as dependencias:

    ``` yarn install ```

    5º Rode o comando para realizar a migração do banco de dados:

    ``` yarn prisma generate ```

    6º Rode o comando para inicializar o servidor:

    ``` yarn dev ```
