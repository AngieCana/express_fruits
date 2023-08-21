const express = require("express");
const app = express();
const fruits = require("./models/fruit.js");
const jsxViewEngine = require("jsx-view-engine");
require('dotenv').config();
const mongoose = require("mongoose");
const Fruit = require("./models/fruit.js");
const veggie = require("./models/veggie.js");
const Vegetables = require('./models/veggie.js');
const router = express.Router();
const methodOverride = require('method-override')

// const veggies = require("./models/veggie.js");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("connected to mongo");
});

app.use(methodOverride('_method'))

// Set up view engine
app.engine("jsx", jsxViewEngine());
app.set("view engine", "jsx");
app.use(express.urlencoded({ extended: false }));
app.post("/fruits/", async (req, res) => {
  try {
    if (req.body.readyToEat === "on") {
      //if checked, req.body.readyToEat is set to 'on'
      req.body.readyToEat = true;
    } else {
      //if not checked, req.body.readyToEat is undefined
      req.body.readyToEat = false;
    }
    const createdFruit = await fruits.create(req.body);
    res.redirect("/fruits");
  } catch (error) {
    console.error("Error creating fruit:", error);
    res.redirect("/fruits"); // or handle the error in another way
  }
});


// Define Routes

//home page
app.get("/", (req, res) => {
  res.send("This is the homepage for Fruits and Veggies");
});

//shows all the fruits
app.get("/fruits", async(req, res) => {
  try {
    const allFruits = await fruits.find();
    //folder path 
    res.render("displayfruits/Index", {
      fruits: allFruits,
    });
  } catch (error) {
    console.error("error fetching fruits", error);
    res.render("ErrorPage", { error: "Failed to fetch frutis" });
  }
});
app.use((req, res, next) => {
  console.log("I run for all routes");
  next();
});


app.get("/fruits/new", (req, res) => {
  res.render("displayfruits/New");
});

//new show route
app.get("/fruits/:id", async (req, res) => {
  try {
    const foundFruit = await Fruit.findById(req.params.id);
    if (foundFruit) {
      res.render("displayfruits/Show", {
        fruit: foundFruit,
      });
    } else {
      res.render("ErrorPage", { error: "Fruit not found" });
      return;
    }
  } catch (error) {
    console.log("Can not find fruit ID", error);
    res.render("ErrorPage", { error: "Failed to fetch fruit ID" });
  }
});

//renders delete path
app.get('/fruits/delete', (req,res) => {
  res.render("displayfruits/Delete")
})

//delete route for fruit
router.delete("/:id", async(req, res) => {
  try {
    const deletedFruit = await Fruit.findByIdAndDelete(req.params.id);
    if (!deletedFruit) {
      return res.status(404).json({message: 'Fruit not found'})
    }
    res.json({message: 'Fruit deleted successfully'})
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error'})
  }
})


//veggie new path
app.get("/veggie", async(req, res) => {
  try {
    const allVeggies = await veggie.find();
    res.render("displayveggies/Index", {
      veggie: allVeggies,
    });
  } catch (error) {
    console.error("error fetching veggies", error);
    res.render("ErrorPage", { error: "Failed to fetch veggies" });
  }
});

//renders the input form
app.get("/veggie/new", (req, res) => {
  res.render("displayveggies/New");
});


//if you click on the veggie link it will take you to a description page
app.post("/veggie/", async (req, res) => {
  try {
    if (req.body.readyToEat === "on") {
      //if checked, req.body.readyToEat is set to 'on'
      req.body.readyToEat = true;
    } else {
      //if not checked, req.body.readyToEat is undefined
      req.body.readyToEat = false;
    }
    const createdVeggie = await veggie.create(req.body);
    res.redirect("/veggie");
  } catch (error) {
    console.error("Error creating veggie:", error);
    res.redirect("/veggie"); // or handle the error in another way
  }
});

//show/link path for veggies
//new show route
app.get("/veggie/:id", async (req, res) => {
  try {
    const foundVeggie = await veggie.findById(req.params.id);
    if (foundVeggie) {
      res.render("displayveggies/Show", {
        veggie: foundVeggie,
      });
    } else {
      res.render("ErrorPage", { error: "Veggie not found" });
      return;
    }
  } catch (error) {
    console.log("Can not find Veggie ID", error);
    res.render("ErrorPage", { error: "Failed to fetch Veggie ID" });
  }
});




app.listen(3000, function () {
  console.log("Server started on port 3000");
});
