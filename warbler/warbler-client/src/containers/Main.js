import React from "react";
// eslint-disable-next-line
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Homepage from "../components/Homepage";
import AuthForm from "../components/AuthForm";
import { authUser } from "../store/actions/auth";

const Main = props => {
  const { authUser } = props;
  return (
    <div className="container">
      <Switch>
        <Route exact path="/" render={props => <Homepage {...props} />} />
        <Route
          path="/signin"
          render={props => {
            return (
              <AuthForm
                buttonText="Log in"
                heading="Welcome Back."
                onAuth={authUser}
                {...props}
              />
            );
          }}
        />
        <Route
          path="/signup"
          render={props => {
            return (
              <AuthForm
                signup
                buttonText="Sign me up!"
                heading="Join Warbler today."
                onAuth={authUser}
                {...props}
              />
            );
          }}
        />
      </Switch>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    { authUser }
  )(Main)
);
