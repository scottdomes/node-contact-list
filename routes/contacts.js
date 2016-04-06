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

/* Post to contacts/new */
router.post('/new', function(req, res) {
  var db = req.db;
  var collection = db.get('contactcollection');
  collection.insert(req.body, function(err, result) {
    res.send(
      (err === null) ? { msg: '' } : { msg: err }
    );
  });
});

module.exports = router;
