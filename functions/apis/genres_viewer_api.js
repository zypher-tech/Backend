'use strict';



var express = require('express');
var admin = require("firebase-admin");

var db = admin.database();
const router = express.Router();


exports.showByGenres = function(req, res){

   var genreName = req.body.genre;
   var genreId = req.body.genreId;
   var booksRef = db.ref("genreId")

	try{	

  		booksRef.orderByKey("genreId").orderByValue().equalTo(genreId).
  		on("value",snap=>{
  			console.log("valuues "+snap.val());
  		});
	}
	catch(e){
		console.log("Something Bad Happend In genre ");
	}

};