var​ secure = require(​'./lib/api-auth.js'​);
​app.use(secure.jwtCheck);