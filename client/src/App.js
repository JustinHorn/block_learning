import React, { useContext, useRef } from "react";
import "./App.css";
import Navbar from "component/Navbar";
import UserContext from "context";

import Mainpage from "pages/MainPage";

import ProjectPage from "pages/Project";

import PrivateRoute from "component/PrivateRoute";

import Post from "pages/Post";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import useFeed from "hooks/useFeed";

function App() {
  const { user } = useContext(UserContext);
  const { data, loading, error } = useFeed();

  return (
    <Router>
      <div className="Layout">
        <main>
          <Navbar />
          {user && !user.verified && <h1>Not verified!</h1>}
          <Switch>
            <Route path="/project/:id">
              <ProjectPage />
            </Route>
            <PrivateRoute path="/post">
              <Post />
            </PrivateRoute>
            <Route exact path="/">
              <Mainpage />
            </Route>
            <Route path="/">
              <Redirect to={"/"}></Redirect>
            </Route>
          </Switch>
          <p style={{ textAlign: "right" }}>
            Send feedback to justinhorn0000@gmail.com
          </p>
        </main>
      </div>
    </Router>
  );
}

export default App;
