
var express = require('express');
var admin = require("firebase-admin");



var failedStatus =  {

	status : '0'

};



exports.saveToken = function(req,res) {

	var fromWhere = req.body.fromWhere;
	var receivedToked = req.body.tokenId;
	var profileId = req.body.profileId;
 	 	if (fromWhere == '0') {
 	 		//From User
			saveUserToken(receivedToked,profileId);
 	 	}
 	 	else if(fromWhere == '1'){
 	 		//from Partners

 	 		savePartnerToken(receivedToken,profileId);
 	 	}
 	 	else if(fromWhere == '2'){
 	 		//Riders
			

 	 		saveRiderToken(receivedToken,profileId);
 	 	}
 	 	else{
 	 			res.send(failedStatus);
 	 	}
};


function saveUserToken(receivedToken,profileId){
	  console.log("Saving User Token");
	  var usersRef  = db.ref("users");

};

function savePartnerToken(receivedToken,profileId){
	  console.log("Saving User Token");
	  var partnersRef  = db.ref("users");

};
function saveRiderToken(receivedToken,profileId){
	  console.log("Saving User Token");
	  var ridersRef  = db.ref("users");

};
