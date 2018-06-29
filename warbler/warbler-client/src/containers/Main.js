import React from "react";
// eslint-disable-next-line
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Homepage from "../components/Homepage";
import AuthForm from "../components/AuthForm";
import { authUser } from "../store/actions/auth";
import { addError, removeError } from "../store/actions/errors";
import withAuth from "../hocs/withAuth";
import MessageForm from "./MessageForm";

const Main = props => {
  const { authUser, errors, removeError, currentUser } = props;
  return (
    <div className="container">
      <Switch>
        <Route
          exact
          path="/"
          render={props => <Homepage currentUser={currentUser} {...props} />}
        />
        <Route
          path="/signin"
          render={props => {
            return (
              <AuthForm
                errors={errors}
                removeError={removeError}
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
                errors={errors}
                removeError={removeError}
                signup
                buttonText="Sign me up!"
                heading="Join Warbler today."
                onAuth={authUser}
                {...props}
              />
            );
          }}
        />
        <Route
          path="/users/:id/messages/new"
          component={withAuth(MessageForm)}
        />
      </Switch>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    errors: state.errors
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    { authUser, addError, removeError }
  )(Main)
);
