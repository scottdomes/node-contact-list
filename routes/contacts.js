var express = require('express');
var router = express.Router();

/* GET contactlist. */
router.get('/contactlist', function(req, res) {
  var db = req.db;
  var collection = db.get('contactlist');
  collection.find({}, {}, function(e, docs) {
    res.json(docs);
  });
});

module.exports = router;
