
var express = require('express');
var admin = require("firebase-admin");
var db = admin.database();



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
	  console.log("user ID "+profileId);
	  var proPath = '/users/'+profileId;
	   var profileRef = db.ref(proPath);
	   var tokenScheme = {
	   	tokenId:receivedToken
	   };

	  try{
	  	
	  	profileRef.child("tokenId").set(tokenScheme).then(function(snap){

	  		console.log("Pushed token  "+snap.val());
	  	})
	  	;
	  }
		catch (e) {
					console.log("Error "+e);
		} finally {


		}

};

function savePartnerToken(receivedToken,profileId){
	  console.log("Saving User Token");
	  var partnersRef  = db.ref("users");

};
function saveRiderToken(receivedToken,profileId){
	  console.log("Saving User Token");
	  var ridersRef  = db.ref("users");

};
