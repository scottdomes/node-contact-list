var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Your Contacts' });
});

/* GET Hello World page. */
router.get('/helloworld', function(req, res) {
  res.render('helloworld', { title: 'Hello, world!!' });
});

/* GET Contactlist page */
router.get('/contactlist', function(req, res) {
  var db = req.db;
  var collection = db.get('contactcollection');
  collection.find({}, {}, function(e, docs) {
    res.render('contactlist', {
      "contactlist" : docs
    });
  });
});

module.exports = router;
