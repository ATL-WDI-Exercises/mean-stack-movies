var mongoose = require('mongoose');

var MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true }
  },
  { timestamps: true }  // createdAt, updatedAt
);

module.exports = mongoose.model('Movie', MovieSchema);
