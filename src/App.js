import "./App.css";

import React, { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import News from "./Pages/News";
import { Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import NewsState from "./context/news/NewsState";
import Bookmarked from "./Pages/Bookmarked";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const pageSize = 5;
  const apiKey = process.env.REACT_APP_NEWS_API;
  const [progress, setProgress] = useState(0);

  const [loggedIn, setLoggedIn] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <div
      className={darkMode === true ? "bg-dark" : ""}
      style={{ minHeight: "100vh" }}
    >
      <NavBar
        loggedIn={loggedIn}
        darkMode={darkMode}
        setLoggedIn={setLoggedIn}
        setDarkMode={setDarkMode}
      />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        theme={darkMode ? "dark" : "light"}
      />
      <LoadingBar height={3} color="#f11946" progress={progress} />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <News
              setProgress={setProgress}
              apiKey={apiKey}
              darkMode={darkMode}
              key="general"
              pageSize={pageSize}
              country="in"
              category="general"
              loggedIn={loggedIn}
            />
          }
        />
        <Route
          exact
          path="/business"
          element={
            <News
              setProgress={setProgress}
              apiKey={apiKey}
              darkMode={darkMode}
              key="business"
              pageSize={pageSize}
              country="in"
              category="business"
              loggedIn={loggedIn}
            />
          }
        />
        <Route
          exact
          path="/entertainment"
          element={
            <News
              setProgress={setProgress}
              apiKey={apiKey}
              darkMode={darkMode}
              key="entertainment"
              pageSize={pageSize}
              country="in"
              category="entertainment"
              loggedIn={loggedIn}
            />
          }
        />
        <Route
          exact
          path="/general"
          element={
            <News
              setProgress={setProgress}
              apiKey={apiKey}
              darkMode={darkMode}
              key="general"
              pageSize={pageSize}
              country="in"
              category="general"
              loggedIn={loggedIn}
            />
          }
        />
        <Route
          exact
          path="/health"
          element={
            <News
              setProgress={setProgress}
              apiKey={apiKey}
              darkMode={darkMode}
              key="health"
              pageSize={pageSize}
              country="in"
              category="health"
              loggedIn={loggedIn}
            />
          }
        />
        <Route
          exact
          path="/science"
          element={
            <News
              setProgress={setProgress}
              apiKey={apiKey}
              darkMode={darkMode}
              key="science"
              pageSize={pageSize}
              country="in"
              category="science"
              loggedIn={loggedIn}
            />
          }
        />
        <Route
          exact
          path="/sports"
          element={
            <News
              setProgress={setProgress}
              apiKey={apiKey}
              darkMode={darkMode}
              key="sports"
              pageSize={pageSize}
              country="in"
              category="sports"
              loggedIn={loggedIn}
            />
          }
        />
        <Route
          exact
          path="/technology"
          element={
            <News
              setProgress={setProgress}
              apiKey={apiKey}
              darkMode={darkMode}
              key="technology"
              pageSize={pageSize}
              country="in"
              category="technology"
              loggedIn={loggedIn}
            />
          }
        />
        <Route
          exact
          path="/bookmark"
          element={
            <Bookmarked
              setProgress={setProgress}
              apiKey={apiKey}
              darkMode={darkMode}
              key="Bookmark"
              pageSize={pageSize}
              country="in"
              category="Bookmark"
              loggedIn={loggedIn}
            />
          }
        />
        <Route
          exact
          path="/login"
          element={<Login darkMode={darkMode} setLoggedIn={setLoggedIn} />}
        />
        <Route
          exact
          path="/signup"
          element={<SignUp darkMode={darkMode} setLoggedIn={setLoggedIn} />}
        />
      </Routes>
    </div>
  );
};

export default App;
