import * as React from "react";
import { Switch, Route, Link, useLocation } from "react-router-dom";
import { IEnvironment } from "relay-runtime";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import CitiesBrowser from "./components/CitiesBrowser";
import SettingsPage from "./pages/SettingsPage";

export default function App({ environment }: { environment: IEnvironment }) {
  return (
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
  );
}
