//create an array of fruits
const mongoose = require('mongoose');
const fruits = [
    {
        name: 'apple',
        color: 'red',
        readyToEat: true
    },
    {
        name: 'banana',
        color: 'green',
        readyToEat: false
    },
    {
        name: 'pear',
        color: 'green',
        readyToEat: true
    }]
const fruitSchema = new mongoose.Schema({
    name:  { type: String, required: true },
    color:  { type: String, required: true },
    readyToEat: Boolean
});
const Fruit = mongoose.model('Fruit', fruitSchema);
    module.exports = Fruit, fruits;