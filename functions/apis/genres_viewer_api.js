'use strict';



var express = require('express');
var admin = require("firebase-admin");

var db = admin.database();
const router = express.Router();




exports.showByGenres = function(req, res){

      // First get the Genres
      //Query the Database by Genres
      // Add the Top 6 Products to Genre


var businessGenre = {
  genreId:4,
  genreName:"Business & Investing",
  products:[]
};


var fictionGenre = {
  genreId:3,
  genreName:"Fictional",
  products:[]
};

var nonfictiongenre = {
  genreId:2,
  genreName:"Non Fictional",
  products:[]
};

var romanceGenre = {
  genreId:0,
  genreName:"Romance",
  products:[]
};

var generalGenre = {
  genreId:1,
  genreName:"General Books",
  products:[]
};

var othersGenre = {
	genreId:9,
	genreName:"Others",
	products:[]
}


      console.log("Inside Genre Viewer");
      var booksRef = db.ref("books");
      booksRef.once("value",snapshot => {
      		console.log("Going Inside For Loop");
      		snapshot.forEach(snap => {
      			
      			console.log("Genre Id "+snap.val().genreId);

      			// Based on Genre Id , Swithc the Products
      			switch(snap.val().genreId){
      					case 0:
      							romanceGenre.products.push({
      								imageURL:snap.val().imageURL,
      								productName:snap.val().productName,
      								pid:snap.val().pid,
      								price:snap.val().price,

      							});
      						break;
						case 1:
								generalGenre.products.push({
      								imageURL:snap.val().imageURL,
      								productName:snap.val().productName,
      								pid:snap.val().pid,
      								price:snap.val().price,

      							});
      						break;

						case 2:
								nonfictiongenre.products.push({
      								imageURL:snap.val().imageURL,
      								productName:snap.val().productName,
      								pid:snap.val().pid,
      								price:snap.val().price,

      							});
      						break;

						case 3:
						fictionGenre.products.push({
      								imageURL:snap.val().imageURL,
      								productName:snap.val().productName,
      								pid:snap.val().pid,
      								price:snap.val().price,

      							});
      						break;

						case 4:
						businessGenre.products.push({
      								imageURL:snap.val().imageURL,
      								productName:snap.val().productName,
      								pid:snap.val().pid,
      								price:snap.val().price,

      							});
      						break;

						default:
							break;
      				}
      		});
      		console.log("Out of For Loop , Pushing Products..");
      		
      		if (!res.headersSent) {
      			console.log("headers Not Sent , Sending ");
				var returnJson = {
					genres:[]
				}
      			returnJson.genres.push(romanceGenre);
      			returnJson.genres.push(fictionGenre);
      			returnJson.genres.push(nonfictiongenre);
      			returnJson.genres.push(businessGenre);
      			returnJson.genres.push(generalGenre);
      			res.send(returnJson);
      		}
      		else{

      			console.log("Response Already Sent")
      		}

      });
};



