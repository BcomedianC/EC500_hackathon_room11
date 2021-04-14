import React, { Component } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import Chat from './pages/Chat';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Time from './pages/Time';


class App extends Component {
  render() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login}></Route>
	<Route path="/login" component={Login}></Route>
	<Route path="/signup" component={Signup}></Route>
	<Route path="/chat" component={Chat}></Route>
	<Route path="/time" component={Time}></Route>
      </Switch>
    </Router>
  );
}
}

export default App;
