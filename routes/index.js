var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('./public/index', { title: 'BookAholic - For Serious Book Addicts' });
});

module.exports = router;
