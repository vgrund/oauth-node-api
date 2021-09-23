/***
 * Excerpted from "Design and Build Great Web APIs",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/maapis for more book information.
***/
/*****************************************
// DARRT Framework
// auth0 support
// 2020-02-01 : mamund
 *****************************************/

// modules 
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');
var jwtAuthz = require('express-jwt-authz');
var utils = require('./utils.js');

// auth variables
var auth = {};
auth.cache = true;
auth.rateLimit = true;
auth.requestsPerMinute = 5;
auth.jwksUri = 'https://dev-9ql57qhw.us.auth0.com/.well-known/jwks.json';
auth.audience = 'https://dev-9ql57qhw.us.auth0.com/api/v2/';
auth.issuer = 'https://dev-9ql57qhw.us.auth0.com/';
auth.algorithms = ['RS256'];

// auth support
var jwtCheck = jwt({
  secret : jwks.expressJwtSecret({
    cache: auth.cache,
    rateLimit: auth.rateLimit,
    jwksRequestsPerMinute: auth.requestsPerMinute,
    jwksUri: auth.jwksUri
  }),
  audience: auth.audience,
  issuer: auth.issuer,
  algorithms: auth.algorithms
});

// export
module.exports = {
  auth, 
  jwtCheck,
  jwtAuthz
};


