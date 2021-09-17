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
// transitions
// 2020-02-01 : mamund
 *****************************************/
 
 // page- and item-level forms
 exports.forms = {
 
   // page level forms
   pageForms: [
   
    // always have a SELF link on every resource
     {
       id:"self",
       name:"self",
       href:"{fullurl}",
       rel: "self colllection credit",
       tags: "collection credit self home list item",
       title: "Self",
       method: "GET",
       properties:[]
     },
     
     // the root of the API
     {
       id:"home",
       name:"home",
       href:"{fullhost}/",
       rel: "collection credit",
       tags: "collection credit home list item",
       title: "Home",
       method: "GET",
       properties:[]
     },
     
     // the list of all credit check records
     {
       id:"list",
       name:"list",
       href:"{fullhost}/list/",
       rel:"collection credit",
       tags:"collection credit home list item",
       title:"List",
       method:"GET",
       properties:[]
     },
     
     // create a new credit-check record
     {
       id: "create",
       name: "create",
       href: "{fullhost}/form/",
       rel: "create-form credit",
       tags:"collection credit list item",
       title: "Create",
       method: "POST",
       properties: [
        {name:"id",value:"{makeid}"},
        {name:"status",value:"active"},
        {name:"companyName",value:""}
       ]
     }
   ],
   
   // forms for each item in the response
   itemForms: [
   
     // link to read a single record
     {
       id:"read_{id}",
       name: "read",
       href: "{fullhost}/list/{id}",
       rel: "item credit read",
       tags: "collection credit item list",
       title: "Read",
       method: "GET",
       properties: []
     },
     
     // link to view the create form
     {
       id:"read_{id}",
       name: "read",
       href: "{fullhost}/form/",
       rel: "item credit read",
       tags: "collection credit form",
       title: "Read",
       method: "GET",
       properties: []
     }
   ]
 }
