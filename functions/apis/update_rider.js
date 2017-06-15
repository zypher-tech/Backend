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
};
