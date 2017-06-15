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
        console.log("Rider Name "+riderName);

    });

  } catch (e) {
      console.log('error '+e);
  } finally {

  }
  };
