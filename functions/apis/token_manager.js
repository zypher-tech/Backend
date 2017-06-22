
var express = require('express');
var admin = require("firebase-admin");
var db = admin.database();



var request ;
var response;
var failedStatus =  {

	status : '0'

};



exports.saveToken = function(req,res) {

	response = res;
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

var success = {
	status : '1'
};


function saveUserToken(receivedToken,profileId){
	  console.log("Saving User Token");
	  
	  //Append user Id to Profile directory
	  var proPath = '/users/'+profileId;

	  //Refer the profile Path

	   var profileRef = db.ref(proPath);


	  try{
	  	  	//Update 
			profileRef.update({
  					"tokenId": receivedToken
			});

			//Display
			profileRef.on("value",snap=>{
				console.log("User Token Updated for user "+snap.val().userId);
				response.send(success);

			});
	  		

	  		/*Procedure for Multiple Updates */
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

					console.log("Error in saving User Token: "+e);
					response.send(failedStatus);
		} 
		finally {

			console.log("priniting finally");
		}

};

function savePartnerToken(receivedToken,profileId){
	  //Rider profile  Path
	  var partnerPath = '/partners/'+profileId;

	  //Refer the profile Path

	   var partnerRef = db.ref(partnerPath);

	     try{
	  	  	//Update 
			partnerRef.update({
  					"tokenId": receivedToken
			});

			//Display
			partnerRef.on("value",snap=>{
				console.log("Token Updated for Rider Id:"+snap.val().userId);
				response.send(success);

			});
		}


		catch (e) {

					console.log("Error in saving Rider  Token: "+e);
					response.send(failedStatus);
		} 
		finally {

			console.log("priniting finally");
			
		}
	  		




};

function saveRiderToken(receivedToken,profileId){
	  console.log("Saving Rider Token");
	  

	  //Rider profile  Path
	  var riderPath = '/riders/'+profileId;

	  //Refer the profile Path

	   var riderRef = db.ref(riderPath);

	     try{
	  	  	//Update 
			riderRef.update({
  					"tokenId": receivedToken
			});

			//Display
			riderRef.on("value",snap=>{
				console.log("Token Updated for Rider Id:"+snap.val().userId);
				response.send(success);

			});
		}


		catch (e) {

					console.log("Error in saving Rider  Token: "+e);
					response.send(failedStatus);
		} 
		finally {

			console.log("priniting finally");
			
		}
};


