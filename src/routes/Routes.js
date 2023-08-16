import React, { Suspense } from "react";
import {
  Router,
  Switch,
  Route
} from "react-router-dom";
import history from "./History";
import * as LazyComponent from "../utils/LazyLoaded";
import Loader from "../components/Loader/Loader";

const Routes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={LazyComponent.Home} />
          <Route path="/cafe/:location?" exact component={LazyComponent.Cafe} />
          <Route path="/employee/:cafe?" exact component={LazyComponent.Employee} />
          <Route path="/*" exact component={LazyComponent.NotFound} />
        </Switch>
      </Router>
    </Suspense>
  );
};

export default Routes;
