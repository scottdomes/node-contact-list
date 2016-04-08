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

/* Update contact date */
router.put('/contacted/:id', function(req, res) {
  var db = req.db;
  var collection = db.get('contactcollection');
  collection.update( { '_id': req.params.id }, { $set: { 'last_contact': req.body.date } }, function(err) {
    res.send((err === null) ? { msg: '' } : { msg: 'error: ' + err});
  });
});

/* Delete to contacts/delete */
router.delete('/delete/:id', function(req, res) {
  var db = req.db;
  var collection = db.get('contactcollection');
  var contactToDelete = req.params.id;
  collection.remove({ '_id' : contactToDelete }, function(err) {
    res.send((err === null) ? { msg: '' } : { msg: 'error: ' + err });
  });
});

module.exports = router;
