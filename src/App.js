import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { SideNav } from "./components";
import { Home, Contact } from "./containers";

const App = () => {
  return (
    <div>
      <SideNav />
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/contact" exact component={Contact} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
