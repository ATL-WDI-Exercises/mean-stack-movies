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

## Step 2: Add Mongoose, Angular, and Angular UI Router to our Project

```bash
npm install --save mongoose
npm install --save angular
npm install --save angular-ui-router
```

Add the following to `app.js`:

```javascript

```


---

## Step 2


---

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
