var express = require('express');
var router = express.Router();

/* GET contactlist. */
router.get('/list', function(req, res) {
  var db = req.db;
  var collection = db.get('contactcollection');
  collection.find({}, {}, function(e, docs) {
    res.json(docs);
  });
});

module.exports = router;
