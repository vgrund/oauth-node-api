/***
 * Excerpted from "Design and Build Great Web APIs",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/maapis for more book information.
***/
/*****************************************
// bigco, inc
// credit check resources 
// 2020-02-01 : mamund
 *****************************************/

/*******************************************
// initialization and setup for DARRT
********************************************/
var express, router, bodyParser, actions, representation, 
  transitions, utils, templates, forms, metadata;

init();

// shared metadata for this service
metadata = [
  {name: "title", value: "BigCo Credit Check Service"},
  {name: "author", value: "Mike Amundsen"},
  {name: "release", value: "1.0.0"}
];

// optional tracking middleware
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now() + " : " + req.headers.host + req.url + " : " + req.method + " : " + JSON.stringify(req.body))
  next()
});

// auth support
// var secure = require('./lib/api-auth.js');
// router.use(secure.jwtCheck);

/************************************************************************/

// shared metadata for this service
var metadata = [
  {name: "title", value: "BigCo Credit Check"},
  {name: "author", value: "Mike Amundsen"},
  {name: "release", value: "1.0.0"} 
];

// ***********************************************************
// public resources for the credit check service
// ***********************************************************

// home
router.get('/', function(req,res){
  var args = {};
  args.request = req;
  args.response = res;
  args.action = actions.home;
  args.type = "home";
  args.config = {
    metadata:metadata,
    templates:templates,
    forms:forms,
    filter:"home"
  };
  respond(args);
});

// credit check list
router.get('/list/',function(req,res){
  var args = {};
  args.request = req;
  args.response = res;
  args.action = actions.list;
  args.type = "credit";
  args.config = {
    metadata:metadata,
    templates:templates,
    forms:forms,
    filter:"list"
  };
  respond(args);
});

// credit check item
router.get('/list/:id', function(req,res){
  var args = {};
  args.request = req;
  args.response = res;
  args.action = actions.item;
  args.type = "credit";
  args.config = {
    metadata:metadata,
    templates:templates,
    forms:forms,
    filter:"item"
  };
  respond(args);
});

// credit check form READ
//router.get('/form/', secure.jwtCheck, secure.jwtAuthz(['check:request']), function(req,res){
router.get('/form/', function(req,res){
  var args = {};
  args.request = req;
  args.response = res;
  args.action = actions.form;
  args.type = "credit";
  args.config = {
    metadata:metadata,
    templates:templates,
    forms:forms,
    filter:"item"
  }
  respond(args);
});

// credit check form CREATE
//router.post('/form/', secure.jwtCheck, secure.jwtAuthz(['check:create']), function(req,res){
router.post('/form/', function(req,res){
  var args = {};
  args.request = req;
  args.response = res;
  args.action = actions.create;
  args.type = "credit";
  args.config = {
    metadata:metadata,
    templates:templates,
    forms:forms,
    filter:"item"
  };
  respond(args);
});

// *******************************************************************
// trap general errors
router.get('*', function(req, res, next) {
  let err = new Error('Page Not Found');
  err.status = 404;
  next(err);
});

router.delete('*', function(req, res, next) {
  let err = new Error('Page Not Found');
  err.status = 404;
  next(err);
});

router.put('*', function(req, res, next) {
  let err = new Error('Page Not Found');
  err.status = 404;
  next(err);
});

router.post('*', function(req, res, next) {
  let err = new Error('Page Not Found');
  err.status = 404;
  next(err);
});

router.patch('*', function(req, res, next) {
  let err = new Error('Page Not Found');
  err.status = 404;
  next(err);
});

// general error-handler
router.use(function(err, req, res, next) {
  var rtn = {};

  console.log("router-level error");
  console.log(err);

  if(res.headersSent) {
    return next(err);  
  }
  
  rtn.type = "Error";
  rtn.title = err.message
  rtn.detail = "Unable to process request";
  rtn.status = err.status
  res.setHeader("content-type","application/problem+json");
  res.status(err.status).send(JSON.stringify(rtn,null,2)+"\n");
});
// end error handling
// *******************************************************************

/***********************************************************************/
// initialize module
function init() {
  express = require('express')
  router = express.Router()
  bodyParser = require('body-parser');

  actions = require('./actions');
  representation = require('./representation');
  transitions = require('./transitions');
  utils = require('./lib/utils');

  // set up request body parsing & response templates
  router.use(bodyParser.json({type:representation.getResponseTypes()}));
  router.use(bodyParser.urlencoded({extended:representation.urlencoded}));

  // load response templates and input forms
  templates = representation.getTemplates();
  forms = transitions.forms;
}

// local resource handler function
function respond(args) {
  var request = args.request||null;
  var response = args.response||null;
  var action = args.action||null;
  var object = args.type||"";
  var config = args.config||{};

  return utils.handler(request,response,action,object,config);	
}

// publish the capability routes
module.exports = router

