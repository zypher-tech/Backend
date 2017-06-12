
'use strict';

var express = require('express');
var admin = require("firebase-admin");

const router = express.Router();

var response;

function showadmin(req,res){
   response = res;
	console.log('inside Log');
	response.sendfile('./public/admin_panel.html');
};

module.exports.showAdmin = showadmin;
