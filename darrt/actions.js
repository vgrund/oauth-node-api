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
// action elements
// 2020-02-01 : mamund
 *****************************************/

var component = require('./lib/component');
var data = require('./data');
var object = "credit";


/***********************************************
// internal functions to support the API
 ***********************************************/
 
// compute rating value for each request
// use this internal function as a stub for now
function computeRating(body) {

  body.ratingValue = (Math.floor(Math.random() * 9) + 1).toString() ;

  return body;
}

/***************************************** 
// actions for the credit-check service
 *****************************************/

// credit check home
module.exports.home = function(req,res) {
  return new Promise(function(resolve,reject) {
    var body = []; 
    
    // hack to handle empty root for non-link types
    ctype = req.get("Accept")||"";
    if("application/json text/csv */*".indexOf(ctype)!==-1) {
      body = {
        id:"list",
        name:"credit-check",
        rel:"collection credit",
        href: "{fullhost}/list/"
      };
    }
    
    if(body) {
      resolve(body);
    }
    else {
      reject({error:"invalid body"});
    }
  });
}

// credit check create
module.exports.create = function(req,res) {
  return new Promise(function(resolve,reject) {
    if(req.body) {
     var body = req.body;
     
     // go get this companie's credit rating
     body = computeRating(body)
    
     resolve(
      component(
        { 
          name:object,
          action:'add',
          item:body,
          props:data.props,
          reqd:data.reqd, 
          enums:data.enums,
          defs:data.defs
        }
       )
     );
    }
    else {
      reject({error:"invalid body"});
    }
  });
};

// credit check list
module.exports.list = function(req,res) {
  return new Promise(function(resolve,reject) {
    resolve(component({name:object,action:'list'}));
  });
}

// credit check item
module.exports.item = function(req,res) {
  return new Promise(function(resolve,reject){
    if(req.params.id && req.params.id!==null) {
      var id = req.params.id;
      resolve(component({name:object,action:'item',id:id}));
    } 
    else {
      reject({error:"missing id"});
    }
  });
}

// credit check form READ
module.exports.form = function(req,res) {
  return new Promise(function(resolve,reject) {
    resolve(component({name:"form",action:'list'}));
  });
}


