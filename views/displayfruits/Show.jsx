const React = require("react");
//this show page would be an example of a single item page when an item is clicked on from the page or the store page

//function to delete fruit
class Show extends React.Component {
  render() {
    const fruit = this.props.fruit;
    return (
      <div>
        <h1>Fruits show Page</h1>
        The{fruit.name} is {fruit.color}.
        {fruit.readyToEat ? "It is good to eat" : "It is not good to eat."}
        {/* <button onClick={DeleteFruit}>Delete</button> */}
      </div>
    );
  }
}

module.exports = Show;
