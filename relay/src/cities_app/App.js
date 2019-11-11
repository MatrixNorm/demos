import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SettingsPage from './pages/SettingsPage'
import CityDetailsPage from './pages/CityDetailsPage'
import CitiesListPage from './pages/CitiesListPage'

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
          </ul>
        </nav>
        <Switch>
          <Route path="/settings">
            <SettingsPage />
          </Route>
          <Route path="/city/:cityId">
            <CityDetailsPage />
          </Route>
          <Route path="/">
            <CitiesListPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
