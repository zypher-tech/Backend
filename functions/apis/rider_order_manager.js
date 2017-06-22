
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

exports.deliveredOrder = function (req,res) {
  var riderId = req.body.riderId;
  var userId  = req.body.userId;
  var orderId = req.body.orderId;
  var orderPath = 'orders/'+orderId+'/deliveryStatus/';


  // body...
};
function sendResult(){
  response.send(returnJson);
};
