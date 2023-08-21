const React = require("react");
class Index extends React.Component {
  render() {
    //map our veggies data to where we want it to go
    const { veggie } = this.props;
    return (
      <div>
        <nav>
          <a href="/veggie/new">Create a New Veggie</a>
        </nav>
        <h1>veggies Index Page</h1>
        <ul>
          {veggie.map((veggie, i) => {
            return (
              <li key={i}>
                The {/**Make sure it is calling veggie.id */}
                <a href={`/veggie/${veggie.id}`}>{veggie.name}</a> is{" "}
                {veggie.color}
                <br />
                {veggie.readyToEat
                  ? "It is ready to eat"
                  : "Nope, it is not good to eat"}
                <br />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
module.exports = Index;
