
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
	  
	  
	  var proPath = '/users/'+profileId;
	  console.log("updating token for userId :"+profileId);
	   var profileRef = db.ref(proPath);


	  try{


			
			profileRef.update({
  					"tokenId": receivedToken
			});
			profileRef.on("value",snap=>{
				console.log("Snap Obtained "+snap.val());
			});
			


	  		
	  		// var updates = {};
  			// updates['/tokenId'] = receivedToken;
  			// console.log("Updating Token");
  			// profileRef.update(updates).
  			// then(function(snap){

  			// 		console.log("Token updated snap"+snap);
  			// 		console.log("Snap firstName +"+snap.firstName);
  					

  			// })
  			// .catch(function(err){
  			// 	console.log("Catching Error "+err);

  			// });	

	  		
	   	}

		catch (e) {

					console.log("Error "+e);
		} 
		finally {


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


