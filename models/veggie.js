//create an array of veggies
const mongoose = require('mongoose')

const veggie = [
  {
    name: 'broccoli',
    color: 'dark green',
    readyToEat: true,
  },
  {
    name: 'yellow onion',
    color: 'yellow',
    readyToEat: true,
  },
  {
    name:'tomato',
    color:'red',
    readyToEat: true,
  }
]

const vegetableSchema = new mongoose.Schema({
  name: {type: String, require },
  color: {type: String, require},
  readyToEat: Boolean
});

const Vegetables = mongoose.model('Veggie', vegetableSchema )

module.exports = Vegetables