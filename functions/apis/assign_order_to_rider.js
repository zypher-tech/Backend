'use strict';


var express = require('express');
var admin = require("firebase-admin");
var db = admin.database();




exports.updateOrder = function(req,res){
			var riderName = req.body.riderName;
			var phoneNumber = req.body.phoneNumber;
			var riderId = req.body.riderId;
			var orderId = req.body.orderId;
			var orderRef = db.ref("orders/"+orderId);
			var riderObj = {
				"rider":{
					riderId:riderId,
					riderName:riderName,
					phoneNumber:phoneNumber
				}
			};
			orderRef.update(riderObj,err=>{
					if (err) {
						if (!res.headersSent) {}
							res.send({status:0});
					}
					else{
						// Written Successfully
						if (!res.headersSent) {}
							res.send({status:1});
					}
			});
};