import React from "react";
import GridNew from "./GridNew";
import "./Navbar.css";

class Navbar extends React.Component {
  state = {
    level: "easy",
    speed: 25,
  };

  buttonSelector = (e) => {
    this.setState({ level: e.target.value });
  };

  handleChange = (e) => {
    this.setState({ speed: e.target.value });
  };

  render() {
    let btnStyle = {
      marginLeft: 10,
    };
    return (
      <div>
        <nav className="navbar mt-5 navbar-expand-lg navbar-dark bg-dark">
          <div className="navbar-nav d-flex center-buttons col-4 ">
            <button
              style={btnStyle}
              onClick={this.buttonSelector}
              className="btn col-4 btn-outline-success float-right"
              type="button"
              value="easy"
            >
              Easy
            </button>
            <button
              style={btnStyle}
              onClick={this.buttonSelector}
              className="btn col-4 btn-outline-success float-right"
              type="button"
              value="medium"
            >
              Medium
            </button>
            <button
              style={btnStyle}
              onClick={this.buttonSelector}
              className="btn col-4 btn-outline-success float-right"
              type="button"
              value="hard"
            >
              Hard
            </button>
          </div>
        </nav>
        <div>
          <p>Default range slider:</p>
          <input
            type="range"
            min="0"
            max="50"
            defaultValue="25"
            onChange={this.handleChange}
          />
        </div>
        <GridNew level={this.state.level} speed={this.state.speed} />
      </div>
    );
  }
}

export default Navbar;
