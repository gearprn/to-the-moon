import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from "./Home";
import Launches from "./Launches";
import LaunchDetail from "./LaunchDetail";
import Rockets from "./Rockets";
import RocketDetail from "./RocketDetail";

function App() {
  return (
    <Router>
      <div className="container mx-auto mt-2">
        <nav>
          <ul className="flex">
            <li className="mr-2">
              <Link to="/">Home</Link>
            </li>
            <li className="mr-2">
              <Link to="/launches">Launches</Link>
            </li>
            <li className="mr-2">
              <Link to="/launch-detail">Launch Detail</Link>
            </li>
            <li className="mr-2">
              <Link to="/rockets">Rockets</Link>
            </li>
            <li className="mr-2">
              <Link to="/rocket-detail">Rocket Detail</Link>
            </li>
          </ul>
        </nav>

        <hr className="m-2" />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/launches" component={Launches} />
          <Route exact path="/launch-detail" component={LaunchDetail} />
          <Route exact path="/rockets" component={Rockets} />
          <Route exact path="/rocket-detail" component={RocketDetail} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
