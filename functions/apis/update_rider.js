'use strict';

var express = require('express');
var admin = require("firebase-admin");


var db = admin.database();




exports.broadcastToRiders = function(order) {

  // Get the Rider Vairables
  //Get the Order Varabels
  // Contruct Notification Body
  // send as FCM Token

  console.log("Order Receieved , Broadcasting to Riders "+ order.orderId);

  var ridersRef = db.ref("riders");
  try {
    ridersRef.on("child_added",snap => {
        var riderName = snap.val().riderName;
        var token = snap.val().tokenId;
        pushNewOrder(token,order);

    });

  } catch (e) {
      console.log('error '+e);
  } finally {

  }
  };


  //Send as a Cloud Message to this Bucket Maybe--?
  function pushNewOrder(tokenId,order){
    var registrationTokens = tokenId;
    var orderId = order.orderId;
    console.log("Pushing orderId:"+order.orderId + " to : "+tokenId);
    

// See the "Defining the message payload" section below for details
// on how to define a message payload.
  var payload = {
     data: {
        orderId:""+order.orderId ,
        orderLat:""+order.orderLat,
        orderLon:""+order.orderLon
    }
  };

  // Send a message to the device corresponding to the provided
  // registration token.
  admin.messaging().sendToDevice(tokenId, payload)
    .then(function(response) {
      // See the MessagingDevicesResponse reference documentation for
      // the contents of response.
      console.log("Successfully sent message:", response);
    })
    .catch(function(error) {
      console.log("Error sending message:", error);
    });

  // See the "Defining the message payload" section below for details
  // on how to define a message payload.

  // var payload = {
  // data: {
  //   type:'new_order' ,
  //   orderId: order.orderId,
  //   orderLat:order.orderLat,
  //   orderLan:order.orderLon,
  //   name : order.firstName + order.lastName,
  //   phoneNumber:order.phoneNumber,
  //   products:order.products,
  //   amount:order.amount;
  //   orderStatus:order.orderStatus;
  //   elapsedBy:order.timingEngine.orderInsertedAt
  //   }
  //   };
  
  // // Send a message to the devices corresponding to the provided
  // // registration tokens.
  // admin.messaging().sendToDevice(registrationTokens, payload)
  // .then(function(response) {
//   // See the MessagingDevicesResponse reference documentation for
//   // the contents of response.
//   // 
  
//    console.log("Successfully sent message:", response);
  // })
  // .catch(function(error) {
  //   console.log("Error sending message:", error);
  // });
  };
