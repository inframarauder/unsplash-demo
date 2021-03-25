import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { SideNav } from "./components";
import { Home } from "./containers";

const App = () => {
  return (
    <div className="center-content">
      <Router>
        <SideNav />
        <Switch>
          <Route path="/" exact component={Home} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
