const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Movie = require('./models/movie');

if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
}
else {
  mongoose.connect('mongodb://localhost/mean-movies');
}
mongoose.connection.on('error', function(err) {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
  }
);
mongoose.connection.once('open', function() {
  console.log("Mongoose has connected to MongoDB!");
});

// our script will not exit until we have disconnected from the db.
function quit() {
  mongoose.disconnect();
  console.log('\nQuitting!');
}

// a simple error handler
function handleError(err) {
  console.error('ERROR:', err);
  quit();
  return err;
}

console.log('removing old movies...');
Movie.remove({})
.then(function() {
  console.log('creating some new movies...');
  const starWars     = new Movie({ title: 'Star Wars',  genre: 'Science Fiction' });
  const groundhogDay = new Movie({ title: 'Groundhog Day', genre: 'Comedy' });
  const patriotGames = new Movie({ title: 'Patriot Games', genre: 'Action' });
  return Movie.create([starWars, groundhogDay, patriotGames]);
})
.then(function(savedMovies) {
  console.log('Just saved', savedMovies.length, 'movies.');
  return Movie.find({});
})
.then(function(allMovies) {
  console.log('Printing all movies:');
  allMovies.forEach(function(movie) {
    console.log(movie);
  });
  quit();
})
.catch(handleError);
