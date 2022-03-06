import React from "react";
import { Switch, Route } from "react-router-dom";
import SignIn from "../signin/signin";
import SignUp from "../signup/signup";
import Feed from "../feed/feed";
import { Redirect } from "../redirect/redirect";

const Router = ({ setToken, Token}) => {
  return (
    <Switch>
      <Route path="/" exact>
        <Feed Token={Token} />
      </Route>
      <Route path="/signin">
        <SignIn Token={Token} setToken={setToken} />
      </Route>
      <Route path="/signup" component={SignUp} />

      <Route path="/redirect">
        {" "}
        <Redirect setToken={setToken} />
      </Route>
    </Switch>
  );
};

export default Router;
