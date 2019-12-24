const express = require('express');
const multer  = require('multer');

const router = express.Router();
const uploads = multer({ dest: 'uploads/csv/' });

const { csvParser } = require('../parsers/csv');

router.post('/', uploads.any(), async function(req, res, next) {
console.log(req.files)
  if (!req.files) {
    return res.status(400).send({message: 'Files not found'});
  }

  if (req.files.length !== 2) {
    return res.status(400).send({message: '1 File not found'});
  }

  csvParser(req,
      response => {res.send(response)},
      err => res.status(500).send({message: err}))
});



module.exports = router;
