# Mean Stack Movies

Let's build a MEAN stack app for doing CRUD with movies.

{{ TOC }}

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
{{ models/movie.js }}
```

3b. The Seeds File

```bash
touch seeds.js
```

Put the following code inside `seeds.js`:

```javascript
{{ seeds.js }}
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
{{ routes/movies.js }}
```

4b. Add the Movies Router to `app.js`:

```javascript
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



---

## Leftovers

npm install --save angular
npm install --save angular-ui-router



## Summary

Summarize what we have learned.

---

## Quiz Questions

List quiz questions with answers here. For example:

<details>
  <summary><strong>Q1: What is 1 + 2?</strong></summary>
  > A: 3
</details>


<details>
  <summary><strong>Q1: What is 3 * 5?</strong></summary>
  > A: 15
</details>


<details>
  <summary><strong>Q1: What is 100 / 20?</strong></summary>
  > A: 5
</details>


## Homework

List links to sample Homework assignments.


## For Further Reading

List some resources here. For example:

* [Markdown](https://daringfireball.net/projects/markdown/)
* [Markdown Wikipedia Page](https://en.wikipedia.org/wiki/Markdown)
* [Markdown Cheat Sheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)
