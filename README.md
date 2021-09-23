# oauth-node-api

## TODOs

* Gerar documentacao com redocly
* Escrever sobre a estrutura do projeto

## Requisitos

* npm
* node
* nodemon
* conta no Auth0

## Estrutura do projeto

* `/security/` -> Contem scripts e variaveis de ambiente para testar a aplicação

## Adicionando dependencias no projeto

npm install -s jwks-rsa

npm install -s jsonwebtoken

npm install -s express-jwt

npm install -s express-jwt-authz

npm install -s body-parser

npm install -s cors

npm install -s ejs

npm install -s express

## Funcionamento da segurança da API

O js `./darrt/lib/api-auth.js` é configurado como middleware do Express. Ele é responsavel por fazer a validação do token no IDP.

## Testando a segurança da API

1. Executar o script `/security/auth0-token.sh` para obter um novo token. Para isso é necessário preencher o `/security/auth0.env`. Como saida, este script escreve o arquivo `auth0-token.env`, que contem um json com o token
2. Copiar o token de `/security/auth0.env` para o `/security/curl-auth.env`
3. npm i
4. npm run dev
5. Executar o script `/security/curl-auth.sh`, que fará a requisição com o token informado em `/security/curl-auth.env`. Enquanto o token for valido, a API deverá retornar 200 com um response body contendo a propriedade `home` como array
