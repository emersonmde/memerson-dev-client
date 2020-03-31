import React from "react";
import { Route, Switch } from "react-router-dom";
import AppliedRoute from "./components/AppliedRoute";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import Home from "./containers/Home";
import Login from "./containers/Login";
import NotFound from "./containers/NotFound";
import NewPost from "./containers/NewPost";
import Posts from "./containers/Posts";

export default function Routes({ appProps }) {
  return (
    <Switch>
      <AppliedRoute path="/" exact component={Home} appProps={appProps} />
      <UnauthenticatedRoute path="/login" exact component={Login} appProps={appProps} />
      <AuthenticatedRoute path="/posts/new" exact component={NewPost} appProps={appProps} />
      <AuthenticatedRoute path="/posts/:id" exact component={Posts} appProps={appProps} />
      <Route component={NotFound} />
    </Switch>
  );
}
