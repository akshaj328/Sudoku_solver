import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import EasyGrid from "./EasyGrid";
import MediumGrid from "./MediumGrid";
import HardGrid from "./HardGrid";

import "./Navbar.css";

class Navbar extends React.Component {
  state = {
    level: "easy",
    speed: 0,
  };

  buttonSelector = (e) => {
    this.setState({ level: e.target.value });
  };

  // btn nav-item col-4 btn-outline-success
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar mt-5 navbar-expand-lg navbar-dark justify-content-center mr-5 bg-dark">
            <ul className="navbar-nav  ">
              <Link to="/">
                <li className="nav-item btn btn-outline-success nav-link">
                  Easy
                </li>
              </Link>

              <Link to="/medium">
                <li className="nav-item btn btn-outline-success nav-link">
                  Medium
                </li>
              </Link>

              <Link to="/hard">
                <li className="nav-item btn btn-outline-success nav-link">
                  Hard
                </li>
              </Link>
            </ul>
          </nav>
          <Switch>
            <Route exact path="/" component={EasyGrid}>
              {/* <EasyGrid /> */}
            </Route>
            <Route exact path="/medium" component={MediumGrid}>
              {/* <MediumGrid /> */}
            </Route>
            <Route exact path="/hard" component={HardGrid}>
              {/* <HardGrid /> */}
            </Route>
          </Switch>
        </div>
      </Router>

      // <div>
      //   <nav className="navbar mt-5 navbar-expand-lg navbar-dark bg-dark">
      //     <div className="navbar-nav d-flex center-buttons col-4 ">
      //       <button
      //         style={btnStyle}
      //         onClick={this.buttonSelector}
      //         className="btn col-4 btn-outline-success float-right"
      //         type="button"
      //         value="easy"
      //       >
      //         Easy
      //       </button>
      //       <button
      //         style={btnStyle}
      //         onClick={this.buttonSelector}
      //         className="btn col-4 btn-outline-success float-right"
      //         type="button"
      //         value="medium"
      //       >
      //         Medium
      //       </button>
      //       <button
      //         style={btnStyle}
      //         onClick={this.buttonSelector}
      //         className="btn col-4 btn-outline-success float-right"
      //         type="button"
      //         value="hard"
      //       >
      //         Hard
      //       </button>
      //     </div>
      //   </nav>
      //   <div>
      //     <p>Default range slider:</p>
      //     <input
      //       type="range"
      //       min="0"
      //       max="50"
      //       defaultValue="25"
      //       onChange={this.handleChange}
      //     />
      //   </div>
      //   <GridNew level={this.state.level} speed={this.state.speed} />
      // </div>
    );
  }
}

export default Navbar;
