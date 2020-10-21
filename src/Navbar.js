import React from "react";
import { HashRouter as Router, Route, Switch, Link } from "react-router-dom";
import EasyGrid from "./EasyGrid";
import MediumGrid from "./MediumGrid";
import HardGrid from "./HardGrid";

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
          <nav className="navbar mt-5 navbar-expand-lg navbar-dark justify-content-center  bg-dark">
            <ul className="navbar-nav  ">
              <Link to={"/"}>
                <li className="nav-item text-success nav-link">Easy</li>
              </Link>

              <Link to={"/medium"}>
                <li className="nav-item text-success nav-link">Medium</li>
              </Link>

              <Link to={"/hard"}>
                <li className="nav-item  text-success nav-link">Hard</li>
              </Link>
            </ul>
          </nav>
          <Switch>
            <Route exact path={"/"} component={EasyGrid}></Route>
            <Route exact path={"/medium"} component={MediumGrid}></Route>
            <Route exact path={"/hard"} component={HardGrid}></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Navbar;
