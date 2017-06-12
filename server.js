const express = require('express');
const app = express();
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var admin = require("firebase-admin");

var serviceAccount = require("./bookaholic-786-firebase-adminsdk-izd89-be4149cddc.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://bookaholic-786.firebaseio.com"
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

var index = require('./routes/index');
var homeApi = require('./routes/home_api');
var  showProduct = require('./routes/show_product_api');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/home', function(req, res) {
	homeApi.initialize(req,res);
});


app.get('/books/:pid',function(req, res) {
	var pid  = req.params.pid;
	console.log(pid);
	showProduct.show(req,res,pid);
});

const server = app.listen(5000, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`Example app listening at http://${host}:${port}`);
});