import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import injectContext from "./store/appContext";

import { Footer } from "./component/footer";
import { Navbar } from "./component/nav/Navbar.jsx";
import { Login } from "./pages/login";
import { Registration } from "./pages/registration";
import { Home } from "./pages/home";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  return (
    <div>
      <BrowserRouter basename={basename}>
        <Navbar />
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Registration />} path="registerUser" />
          <Route element={<Login />} path="login" />
          {/* <Route element={<Single />} path="/single/:theid" /> */}
          <Route element={<h1>Not found!</h1>} path="*" />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
