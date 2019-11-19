import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SettingsPage from "./pages/SettingsPage";
import HomePage from "./pages/HomePage";
import ReimportDataPage from "./pages/ReimportDataPage";

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Main</Link>
            </li>
            <li>
              <Link to="/settings">Settings</Link>
            </li>
            <li>
              <Link to="/reimport">Re-Import Data</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/settings">
            <SettingsPage />
          </Route>
          <Route path="/reimport">
            <ReimportDataPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
