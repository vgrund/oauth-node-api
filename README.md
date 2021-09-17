# oauth-node-api

## TODOs

* Gerar documentacao com redocly
* Escrever sobre a estrutura do projeto
* Escrever sobre como testar a segurança do projeto

## Estrutura do projeto

* `/security/` -> Contem scripts e variaveis de ambiente para testar a aplicação

## Adicionando dependencias no projeto

npm install -s jwks-rsa

npm install -s jsonwebtoken

npm install -s express-jwt

npm install -s express-jwt-atuhz

npm install -s body-parser

npm install -s cors

npm install -s ejs

npm install -s express

## Configurando a segurança da API

## Testando a segurança da API

* Executar o script `/security/auth0-token.sh` para obter um novo token. Para isso é necessário preencher o `/security/auth0.env`. Como saida, este script escreve o arquivo `auth0-token.env`, que contem um json com o token
* Copiar o token de `/security/auth0.env` para o `/security/curl-auth.env`
* Executar o script `/security/curl-auth.sh`, que fará a requisição com o token informado em `/security/curl-auth.env`
