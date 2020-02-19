import * as React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { IEnvironment } from "relay-runtime";
import CitiesBrowser from "./components/CitiesBrowser";
import SettingsPage from "./pages/SettingsPage";

export default function App({ environment }: { environment: IEnvironment }) {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Cities</Link>
            </li>
            <li>
              <Link to="/settings">Settings</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/">
            <CitiesBrowser environment={environment} />
          </Route>
          <Route path="/settings">
            <SettingsPage environment={environment} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
