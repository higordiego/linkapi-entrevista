# Linkapi Entrevista

## Instruções gerais
Os Kapivaras trabalham em um ambiente dinâmico, com grandes responsabilidades e muitas decisões que devem ser tomadas rapidamente. Nesta fase iremos ter um teste técnico. #dreamteam #kapivara
Leia atentamente as instruções abaixo para a realização do teste proposto.
Você terá em torno de 72h para realizar o teste proposto.
_____________________________________________

## OBJETIVO
Deverá construir uma API RESTful usando a tecnologia NodeJS.


## REQUISITOS
    ● Criar contas testes nas plataformas Pipedrive e Bling.
    ● Criar uma integração entre as plataformas Pipedrive e Bling. (A integração deve buscar as oportunidades com status igual a ganho no Pipedrive, depois inseri-las como pedido no Bling).
    ● Criar banco de dados mongo, existem serviços como MongoDB Atlas para criar de graça
    ● Criar uma collection no banco de dados MongoDB agregando as oportunidades inseridas no Bling por dia e valor total.
    ● Criar endpoint para trazer os dados consolidados da collection do MongoDB.

## INSTRUÇÕES
    ● Desenvolva e versione o projeto usando git
    ● Utilize o GitHub para hospedar o código
    ● Enviar o link do repositório para people@linkapi.com.br

## O QUE SERÁ AVALIADO
    ● Quantidade de requisitos realizados
    ● Desacoplamento de código
    ● Legibilidade
    ● Boas práticas de desenvolvimento de API RESTful
    ● Performance


## Iniciando o projeto

Para iniciar o projeto siga os passos abaixo.

### Criar .env do projeto

```dotenv
# MONGODB
DB_DATABASE_URL="mongodb://mongodb_linkapi/linkapi" <-- caso for usar o docker continue com essa configuração.

# EXPRESS PORT
EXPRESS_PORT="3000" <-- porta de entrada da aplicação. 

# Integration PIPEDRIVE
INTEGRATION_PIPEDRIVE_TOKEN="SEU TOKEN AQUI" <-- token do pipedrive
INTEGRATION_PIPEDRIVE_URL="https://api.pipedrive.com/v1/"
```

### Instalando dependências.

```shell
yarn install
```

### Iniciando o projeto com o docker compose.
```shell
docker-compose up -d
```

### Iniciando o projeto sem o docker

```shell
yarn start
```

### Pegar todas as oportunidades

```shell
  curl --location --request GET 'http://localhost:3000/api/opportunities?page=1&limit=10'
```
