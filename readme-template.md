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

## Step 4: 

4a. Add Some Movie Routes

```bash
touch routes/movies.js

```

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
