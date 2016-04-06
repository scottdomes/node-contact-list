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

/* POST to Add Contact */
router.post('/contacts/new', function (req, res) {

  // Set DB
  var db = req.db;

  var contactFirstName = req.body.first_name;
  var contactLastName = req.body.last_name;
  var contactEmail = req.body.contact_email;

  // Set collection
  var collection = db.get('contactcollection');

  // Submit to DB
  collection.insert({
    "first_name" : contactFirstName,
    "last_name" : contactLastName,
    "email" : contactEmail
  }, function (err, doc) {
    if (err) {
      res.send("There was a problem adding to DB.");
    } else {
      res.redirect("/");
    }
  });

});

module.exports = router;
