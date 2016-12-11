import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Layout from './Layout';
import Home from './Home';
import ImageDetail from './ImageDetail';
import SearchResults from './SearchResults';
import Dashboard from './Dashboard';

export default class CustomRouter extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Layout}>
          <IndexRoute component={Home} />
          <Route path="/detail/:id" component={ImageDetail} />
          <Route path="/search/:searchQuery" component={SearchResults} />
          <Route path="/dashboard" component={Dashboard} />
        </Route>
      </Router>
    );
  }
}
