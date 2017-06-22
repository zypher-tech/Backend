
'use strict';

var express = require('express');
var admin = require("firebase-admin");


var db = admin.database();
var response;


var returnJson ={
  orders:[]
};
exports.getOrders = function(req, res){
  response = res;
  var riderId = req.body.riderId;
  var ordersRef = db.ref("orders");
  ordersRef.on("value",snap=>{
      snap.forEach(snapshot => {
          if (snapshot.val().riderId == riderId) {

            returnJson.orders.push(snapshot.val());


          }
      });
  })
  .then(sendResult,error);
};

function sendResult(){
  response.send(returnJson);
};


exports.delivered = function (req,res) {
  var orderId = req.body.orderId;
  var userId = req.body.riderId;
  var timeDelivered = req.body.timeDeliveredAt;
  var userId = req.body.userId;

  var orderPath = 'orders/'+orderId;
  var ordersRef = db.ref(orderPath);
  ordersRef.update({
    deliveryStatus:1
  });
  ordersRef.on("Value",snap =>{
    console.log("Order Completed "+snap.val());
  });

};
