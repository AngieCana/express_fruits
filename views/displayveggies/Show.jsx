const React = require("react");
//this show page would be an example of a single item page when an item is clicked on from the page or the store page
class Show extends React.Component {
  render() {
    const veggie = this.props.veggie;
    return (
      <div>
        <h1>Veggie show Page</h1>
        The{veggie.name} is {veggie.color}.
        {veggie.readyToEat ? "It is good to eat" : "It is not good to eat."}
      </div>
    );
  }
}

module.exports = Show;
