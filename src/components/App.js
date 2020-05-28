import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./Header";
import Landing from "./Landing";
import Login from "./Auth/Login";
import ForgotPassword from "./Auth/ForgotPassword";
import TrailList from "./Trail/TrailList";
import TrailDetail from "./Trail/TrailDetail";
import CreateTrail from "./Trail/CreateTrail";
import useAuth from "./Auth/useAuth";
import firebase, { FirebaseContext } from "../firebase";

function App() {
  const user = useAuth();

  return (
    <BrowserRouter>
      <FirebaseContext.Provider value={{ user, firebase }}>
        <Header />

        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/login" component={Login} />
          <Route path="/forgot" component={ForgotPassword} />
          <Route path="/create" component={CreateTrail} />
          <Route path="/trails" exact component={TrailList} />
          <Route path="/trails/:id" component={TrailDetail} />
        </Switch>
      </FirebaseContext.Provider>
    </BrowserRouter>
  );
}

export default App;
