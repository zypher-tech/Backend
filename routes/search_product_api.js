var express = require('express');
var router = express.Router();
var admin = require("firebase-admin");



// Get a database reference to our blog
var db = admin.database();
var response ;
var request ;
// Get a database reference to our blog
var db = admin.database();


/*  This Product can have  */
var produtResults = {
  products:[]
}
exports.searchProductByName = function (name) {


};

exports.searchProductByPid = function (pid) {
    var booksRef = db.ref("books");
    var ref = db.ref("books");
   ref.once("child_added", function(snapshot) {

       if (pidtoShow == snapshot.val().pid) {
         res.send(snapshot.val());
       }


   });
};
