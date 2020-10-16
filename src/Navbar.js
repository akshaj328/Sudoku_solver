import React from "react";
import GridNew from "./GridNew";
import "./Navbar.css";

class Navbar extends React.Component {
  state = {
    level: "easy",
  };

  buttonSelector = (e) => {
    this.setState({ level: e.target.value });
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
        <GridNew level={this.state.level} />
      </div>
    );
  }
}

export default Navbar;
