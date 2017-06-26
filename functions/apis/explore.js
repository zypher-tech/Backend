





'use strict';

var express = require('express');
var admin = require("firebase-admin");


var response ;
var returnJson = {
	{
		"genreId":0,
		"genreName":"Business"
		"products":{
			pid:"THe Innovators Dillema",
			productName:'',
			imageURL:'',
			pricing:'',
			readDuration:'',
		}
	}
};





exports.showExploreProducts = function (req,res) {
		//First Get the Top Genres
		// Load the Child in that Genres 
		// Add up and Respond
		var genRef = db.ref("genres");
		genRef.once("value",snap =>{
			var genCount = snap.numChildren();
			snap.forEach(singleSnap => {
					
			});
		});
};