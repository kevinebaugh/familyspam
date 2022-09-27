import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';

import SignInUp from "./SignInUp";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <NavBar name={name} handleSignOut={handleSignOut} /> */}
        <Switch>
          <Route exact path="/sign-in">
            <SignInUp />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
