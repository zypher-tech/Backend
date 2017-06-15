'use strict';

var express = require('express');
var admin = require("firebase-admin");


var db = admin.database();



exports.broadcastToPartner = function(order) {

  // Get the Parner Vairables
  //Get the Order Varabels
  // Contruct Notification Body
  // send as FCM Token
  console.log("Order Receieved , Broadcasting to Partner "+order.orderId);

};
