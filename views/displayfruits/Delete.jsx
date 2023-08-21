const React = require("react");

class Delete extends React.Component {
  render() {
    return (
      <div>
        <h1>Delete a Fruit Page: choose a fruit to delete</h1>
        {/* NOTE: action will be the route, method will be the HTTP verb */}
        <form action={`/fruit/$fruits._id`} method="DELETE">
          Name: <input type="text" name="name" />
          <br />
          Color: <input type="text" name="color" />
          <br />
          Is Ready To Eat: <input type="checkbox" name="readyToEat" />
          <br />
          <input type="submit" name="delete" value="Delete Fruit" />
        </form>
      </div>
    );
  }
}

module.exports = Delete;
