'use strict';

var express = require('express');
var admin = require("firebase-admin");


var db = admin.database();
var response;


exports.showHome = function(req, res){
	var partnerId = req.body.partnerId;
	// show
	//  var partnerId = req.body.partnerId;
	 var partnerPath = "partners/"+partnerId+'/home';

	 // show him book pages, ordered Times , amount Earned from book
	 //show him his rank,free pic
	 var partnerRef = db.ref(partnerPath);
  	 partnerRef.once("value",snap=>{
    	 if (!res.headersSent) {
        	  res.send(snap.val());
        	}
     });
  };


  exports.getBooksByPartnerId = function(req,res){

  		var partnerId = req.body.partnerId;
  		console.log("Getting books for parnter Id "+partnerId);
  		var booksRef = db.ref("books");
  		booksRef.orderByChild("partnerId")
  		.equalTo(partnerId).once("value",snap=>{
  				res.send(snap.val());
  		});

  };