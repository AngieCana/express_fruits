const express = require("express");
//import express = from ('express`)
const fruits = require("./components/fruits.js");
const veggies = require("./components/veggies.js");

const app = express();

app.set("view engine", "jsx");
app.engine("jsx", require("jsx-view-engine").createEngine());

//Define Routes

app.get("/", (req, res) => {
  res.send("Home page of fruits and veggies.");
});

app.get("/fruits/", (req, res) => {
  res.send("Index", { fruits: fruits });
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});

//view body of post request
//near the top, around other app.use() calls
app.use(express.urlencoded({ extended: false }));

//create post request to fruits
app.post("/fruits", (req, res) => {
  console.log(req.body);
  res.send("data received");
});

//push data into fruits array
app.post("/fruits", (req, res) => {
  if (req.body.readyToEat === "on") {
    //if checked, req.body.readyToEat is set to 'on'
    req.body.readyToEat = true; //do some data correction
  } else {
    //if not checked, req.body.readyToEat is undefined
    req.body.readyToEat = false; //do some data correction
  }
  fruits.push(req.body);
  console.log(fruits);
  res.send("data received");
});

//send user back to fruits index upon completion
app.post("/fruits", (req, res) => {
  if (req.body.readyToEat === "on") {
    //if checked, req.body.readyToEat is set to 'on'
    req.body.readyToEat = true;
  } else {
    //if not checked, req.body.readyToEat is undefined
    req.body.readyToEat = false;
  }
  fruits.push(req.body);
  res.redirect("/fruits"); //send the user back to /fruits
});

//have a function that executes all routes
app.use((req, res, next) => {
  console.log("I run for all routes");
  next();
});

//route to create new food
app.get("/fruits/new", (req, res) => {
  res.render("New");
});

//create a show route (show routes use a get request)
app.get("/fruits/:indexOfFruitsArray", (req, res) => {
  // res.send(fruits[req.params.indexOfFruitsArray]);
  res.render("Show");
  //include a second param that must be an object (req.params.index)
  fruit: fruits[req.params.indexOfFruitsArray];
});

app.get("/veggies/:indexOfVeggiesArray", (req, res) => {
  res.send(veggies[req.params.indexOfVeggiesArray]);
});
