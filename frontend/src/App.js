import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm/";
import SignUpForm from "./components/auth/SignUpForm/";
import NavBar from "./components/Navbar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import ImagesPage from "./components/imagesPage";
import CreateImagePage from "./components/CreateImagePage";
import { authenticate } from "./store/session";
import ProfilePage from "./components/ProfilePage";
import HomePage from "./components/HomePage";
import MessagesPage from "./components/MessagesPage/MessagesPage";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path="/games/new" exact={true}>
          <CreateImagePage />
        </ProtectedRoute>
        <ProtectedRoute path="/messages" exact={true}>
          <MessagesPage />
        </ProtectedRoute>
        <ProtectedRoute path="/users" exact={true}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true}>
          <ProfilePage />
        </ProtectedRoute>
        <ProtectedRoute path="/games" exact={true}>
          <ImagesPage />
        </ProtectedRoute>
        <ProtectedRoute path="/" exact={true}>
          <HomePage />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
