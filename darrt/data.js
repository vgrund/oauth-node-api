/***
 * Excerpted from "Design and Build Great Web APIs",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/maapis for more book information.
***/
// ****************************************
// DARRT framework
// credit-check data elements 
// properties, requireds, and enums
// 2020-03-01 : mamund
// ****************************************

// this service's message properties
exports.props = [
  'id',
  'status',
  'companyName',
  'ratingValue',
  'dateCreated',
  'dateUpdated'
];

// required properties
exports.reqd = ['companyName'];

// enumerated properties
exports.enums = [
  {status:['pending','active','suspended','closed']}
];

// default values
exports.defs = [
  {name:'status', value:'active'}
];

