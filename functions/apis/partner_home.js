'use strict';

var express = require('express');
var admin = require("firebase-admin");


var db = admin.database();
var response;


exports.showHome = function(req,res){
	var partnerId = req.body.partnerId;
	// show
	//  var partnerId = req.body.partnerId;
	 var partnerPath = "partners/" + partnerId;
   console.log("Partner Path "+partnerPath);

	 // show him book pages, ordered Times , amount Earned from book
	 //show him his rank,free pic
	 var partnerRef = db.ref(partnerPath);

  	 partnerRef.once("value",snap => { 
      console.log("Value obtained "+snap.val());
    	 if (!res.headersSent) {
        	  res.send(snap.val());
        	}
     });
};


  exports.getBooksByPartnerId = function(req,res){

      var returnJson = {
        "books":[]
      }
  		var partnerId = req.body.partnerId;
  		console.log("Getting books for parnter Id "+partnerId);
  		var booksRef = db.ref("books");
  		booksRef.orderByChild("partnerId")
  		.equalTo(partnerId).once("value",snap=>{
  				snap.forEach(s =>{
              var pid =s.val().pid;
              var pName = s.val().pName;
              var image = s.val().imageURL;
              var Mrp = s.val().MRP;

              returnJson.books.push({
                pid:pid,
                pName:pName,
                imageURL:image,
                MRP:Mrp
              });
          });
          if (!res.headersSent) {
            res.send(returnJson);
          }
  		});

  };