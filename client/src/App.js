import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

import SignInUp from "./SignInUp";
import NavBar from "./NavBar";
import Faqs from "./Faqs";
import GroupManagement from "./GroupManagement";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/me")
      .then(response => {
        if (response.ok) {
          response.json()
          .then(data => {
            setUser(data)
          })
        } else {
          console.log("Signed out")
        }
      })
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar user={user} />
        <Switch>
          {user &&
            <Route exact path="/group-management">
              <GroupManagement user={user} />
            </Route>
          }
          <Route exact path="/sign-in">
            <SignInUp user={user} setUser={setUser} />
          </Route>
        </Switch>
        <Route exact path="/">
          {user ? (
            <GroupManagement user={user} />
          ) : (
            <SignInUp user={user} setUser={setUser} />
          )}
        </Route>
        <Route exact path="/faqs">
          <Faqs />
        </Route>
      </BrowserRouter>
      </div>
  );
}

export default App;

