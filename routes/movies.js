var express = require('express');
var router = express.Router();

var Movie = require('../models/movie');

function makeError(res, message, status) {
  res.statusCode = status;
  var error = new Error(message);
  error.status = status;
  return error;
}

// INDEX
// get all the movies and return as JSON data
router.get('/', function(req, res, next) {
  Movie.find({}).sort('-createdAt')
  .then(function(movies) {
    res.json({ movies: movies });
  })
  .catch(function(err) {
    return next(err);
  });
});

// SHOW
// return data for a single movie as JSON
router.get('/:id', function(req, res, next) {
  Movie.findById(req.params.id)
  .then(function(movie) {
    if (!movie) return next(makeError(res, 'Document not found', 404));
    res.json({ movie: movie });
  })
  .catch(function(err) {
    return next(err);
  });
});

module.exports = router;
