var express = require('express');
var app = express();
var cors = require('cors');

// resources = Rotas da API
var resources = require('./darrt/resources');
var utils = require('./darrt/lib/utils.js');
var port = process.env.PORT || 8181;

//******************************************
// start of auth support - implementação do auth
var secure = require('./darrt/lib/api-auth.js');

// registrando a função jwtCheck como middleware no pipeline do Express
app.use(secure.jwtCheck);
// end of auth support
//******************************************

// general error-handler
app.use(function(err, req, res, next) {
  var rtn = {};

  console.log("app-level error");
  console.log(err);
  
  if(res.headersSent) {
    return next(err);  
  }
  
  rtn.type = "Error";
  rtn.title = err.name
  rtn.detail = err.message;
  rtn.status = err.status
  res.setHeader("content-type","application/problem+json");
  res.status(err.status).send(JSON.stringify(rtn,null,2)+"\n");
});


// *************************************************************

// support calls from JS in browser
app.use(cors());
app.options('*',cors()); 

// definindo as rotas da API
app.use('/',resources); 

// start listening for requests
app.listen(port, () => console.log(`listening on port ${port}!`));
