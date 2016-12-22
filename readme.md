<!--
This file is auto-generated from a 'template.md'
file using the 'md-process' script.
Therefore *DO NOT* edit this file directly!
Instead edit the template file and then run 'md-process'.
-->

# Mean Stack Movies

Let's build a MEAN stack app for doing CRUD with movies.

## Table of Contents

* [Prerequisites](#prerequisites)
* [Learning Objectives](#learning-objectives)
  * [Concepts](#concepts)
  * [Skills](#skills)
* [Step 1: Getting Started](#step-1-getting-started)
* [Step 2: Add Mongoose to our Project](#step-2-add-mongoose-to-our-project)
* [Step 3: Create a Movies Mongoose Model and a Seeds file](#step-3-create-a-movies-mongoose-model-and-a-seeds-file)
* [Step 4: Add Some Movie Routes](#step-4-add-some-movie-routes)
* [Step 5: Add Angular](#step-5-add-angular)
* [Step 6: Add Client Code to Get Movies Data from Server](#step-6-add-client-code-to-get-movies-data-from-server)

---

## Prerequisites

* MongoDB and Mongoose
* NodeJS and Express
* RESTful Routing with Express
* AngularJS Templates, Controllers, $http
* Angular UI Router

---

## Learning Objectives

### Concepts

* Separation of concerns between client (Angular) code and server (Express) code.

---

### Skills

List the skills we will learn.

* Create an Express App that uses MongoDB and Mongoose
* Integrate some AngularJS code into the Express App
* Add CRUD operations to both the AngularJS code (sends CRUD requests) and Express code (processes the CRUD requests).

---

## Step 1: Getting Started

```bash
cd ~/ga/wdi/unit3
mkdir mean-stack-movies
cd mean-stack-movies
express --view=pug      # run the express generator
npm install             # install the dependencies
echo "node_modules" > .gitignore
git init
git add -A
git commit -m "Created project with express generator"
git tag step1
```

---

## Step 2: Add Mongoose to our Project

```bash
npm install --save mongoose
```

Add the following to `app.js`:

```javascript
...

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

...

// Connect to database
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
```

Save your work:

```bash
git add -A
git commit -m "Added Mongoose"
git tag step2
```

---

## Step 3: Create a Movies Mongoose Model and a Seeds file

3a. The Mongoose Model

```bash
mkdir models
touch models/movie.js
```

Put the following code inside `models/movie.js`:

```javascript
var mongoose = require('mongoose');

var MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true }
  },
  { timestamps: true }  // createdAt, updatedAt
);

module.exports = mongoose.model('Movie', MovieSchema);
```

3b. The Seeds File

```bash
touch seeds.js
```

Put the following code inside `seeds.js`:

```javascript
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
```

Test out the seeds file:

```bash
node seeds.js
```

3c. Save your work:

```bash
git add -A
git commit -m "Added Mongoose Movie model and seeds file."
git tag step3
```

## Step 4: Add Some Movie Routes

Let's add an `INDEX` and a `SHOW` route for our Movies. Each route will return JSON data.

4a. Add Some Movie Routes

```bash
touch routes/movies.js
```

Add the following content to `routes/movies.js`:

```javascript
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
```

4b. Add the Movies Router to `app.js`:

```javascript
...

var movies = require('./routes/movies');

...

/**
  * Using an 'api' prefix here is a nice convention!
  * We can put all of our JSON data routes under '/api/'
**/
app.use('/api/movies', movies);
```

4c. Start up the server and test out the Movie routes:

First let's edit `package.json` and add a `nodemon` script:

```javascript
  "scripts": {
    "start": "node ./bin/www",
    "dev": "nodemon ./bin/www"
  },
```

```bash
npm run dev
```

4d. Test with browser

Point your browser to `http://localhost:3000/api/movies`
Then try `http://localhost:3000/api/movies/<some-movie-id>`

4e. Test with `httpie`:

```bash
http localhost:3000/api/movies
http localhost:3000/api/movies/<some-movie-id>
```

4f. Save your work:

```bash
git add -A
git commit -m "Added Movie INDEX and SHOW routes."
git tag step4
```

## Step 5: Add Angular

5a. Install the Angular and Angular UI Router modules:

```bash
npm install --save angular
npm install --save angular-ui-router
```

5b. Add the main Client-Side JavaScript file:

```bash
touch public/javascripts/client.js
```

Add the following content to `public/javascripts/client.js`:

```javascript
const app = angular.module('moviesApp', ['ui.router']);
app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: '/templates/home.html',
    controller: 'homeCtrl',
    controllerAs: '$ctrl'
  });
  $stateProvider
  .state('about', {
    url: '/about',
    templateUrl: '/templates/about.html',
    controller: 'aboutCtrl',
    controllerAs: '$ctrl'
  });
  $urlRouterProvider.otherwise("/");
  // $locationProvider.html5Mode({ enabled: true, requireBase: false });
});
app.controller('homeCtrl', function() {
  this.title = 'Welcome to My Movies App';
});
app.controller('aboutCtrl', function() {
  this.title = 'About my Movies App';
});
```

The above code defines our client-side routes (states) and our controllers.

5c. Wireup `layout.pug` to include our Client-Side scripts and bootstrap Angular::

```pug
doctype html
html(ng-app="moviesApp")
  head
    title= title
    link(rel='stylesheet', href='/stylesheets/style.css')
  body
    nav
      button
        a(ui-sref='home') Home
      button
        a(ui-sref='about') About
    main(ui-view='')
    block content
    script(src='/angular/angular.min.js', charset='utf-8')
    script(src='/angular-ui-router/release/angular-ui-router.min.js', charset='utf-8')
    script(src='/javascripts/client.js')
```

5d. Add `node_modules` as a static path to Express

We need Express to farm out our `node_modules` client dependencies for us.
Add the following line to `app.js` after the line that adds the `public` static path:

```javascript
app.use(express.static(path.join(__dirname, 'node_modules')));
```

5e. Create our `home` and `about` templates:

```bash
mkdir public/templates
touch public/templates/home.html
touch public/templates/about.html
```

The content of `public/templates/home.html`:

```html
<h1>{{ $ctrl.title }}</h1>
```

The content of `public/templates/about.html`:

```html
<h1>{{ $ctrl.title }}</h1>
```

5f. Test it out

5g. Save your work

```bash
git add -A
git commit -m "Added Angular and UI Router."
git tag step5
```

---

## Step 6: Add Client Code to Get Movies Data from Server

Coming Soon!!!
