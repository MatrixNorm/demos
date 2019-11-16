// @flow

import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ImportDataPage from './pages/ImportData'
import SettingsPage from './pages/Settings'
import CityDetailsPage from './pages/CityDetails'
import MainPage from './pages/Main'

export default function Root() {
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
              <Link to="/import">Import Data</Link>
            </li>
          </ul>
        </nav>
        <Switch>
        <Route path="/import">
            <ImportDataPage />
          </Route>
          <Route path="/settings">
            <SettingsPage />
          </Route>
          <Route path="/city/:cityId">
            <CityDetailsPage />
          </Route>
          <Route path="/">
            <MainPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
