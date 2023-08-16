const express = require("express");
const jsxViewEngine = require("jsx-view-engine");
const fruits = require("./components/fruits")
const veggies = require("./components/veggies")
const app = express();
app.set("view engine", "jsx");
app.engine("jsx", jsxViewEngine());

// Define middleware
app.use((req, res, next) => {
  console.log("I run for all routes");
  next();
});

app.use(express.urlencoded({ extended: false }));
// Define routes
app.get("/", (req, res) => {
  res.send("Home page of Fruits and Veggies");
});

app.get("/fruits/", (req, res) => {
  // res.send(fruits)
  res.render("Index", { fruits: fruits });
});

app.get("/fruits/new", (req, res) => {
  res.render("New");
});
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
  res.redirect("/fruits"); // sends user back to fruits page, /fruits
  res.send("data received");
});
// Create a SHOW route (show routes use a get request)
app.get("/fruits/:indexOfFruitsArray", (req, res) => {
  // res.send(fruits[req.params.indexOfFruitsArray]);
  res.render("Show", {
    // include a second param that must be an object (req.params.indexOfFruitsArray)
    fruit: fruits[req.params.indexOfFruitsArray],
  });
});
app.get("/veggies/", (req, res) => {
  res.send(veggies);
});
app.get("/veggies/:indexOfVegetablesArray", (req, res) => {
  res.send(veggies[req.params.indexOfVegetablesArray]);
});
app.listen(3000, () => {
  console.log("Listening on port 3000");
});
