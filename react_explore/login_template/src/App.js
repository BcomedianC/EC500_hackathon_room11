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


class App extends Component {
  render() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login}></Route>
	<Route exact path="/login" component={Login}></Route>
	<Route exact path="/signup" component={Signup}></Route>
	<Route exact path="/chat" component={Chat}></Route>
      </Switch>
    </Router>
  );
}
}

export default App;
