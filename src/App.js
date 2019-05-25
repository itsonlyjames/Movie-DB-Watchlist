import React, { Component } from "react";
import { connect } from "react-redux";
import Cookies from "universal-cookie";
import { API_URL } from "./config/api";
import { Switch, Route } from "react-router-dom";
import { setUser } from "./store/actions";
import "./App.css";
import Home from "./containers/Home";
import List from "./containers/List";

const cookies = new Cookies();

class App extends Component {
  fetchUserDetails = async session_id => {
    const accountResponse = await fetch(API_URL.account(session_id));

    const accountRes = await accountResponse.json();

    this.props.setUser(accountRes);

    return accountRes;
  };

  componentDidMount() {
    const session_id = cookies.get("sessionId");

    if (session_id) {
      this.fetchUserDetails(session_id);
    }
  }
  render() {
    return (
      <main>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/list" component={List} />
        </Switch>
      </main>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  setUser: user => dispatch(setUser(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
