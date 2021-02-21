import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "../App.css";

import Home from "./Home";
import Launches from "./Launches";
import LaunchDetail from "./LaunchDetail";
import Rockets from "./Rockets";
import RocketDetail from "./RocketDetail";
import Navbar from "../components/Navbar";
import { ThemeProvider } from "../contexts/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Navbar />
        <div className="App bg-gray-100 dark:bg-gray-200 text-dark dark:text-white">
          <div className="container px-4 mx-auto pt-5">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/launches" component={Launches} />
              <Route exact path="/launch-detail" component={LaunchDetail} />
              <Route exact path="/rockets" component={Rockets} />
              <Route exact path="/rocket-detail" component={RocketDetail} />
            </Switch>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
