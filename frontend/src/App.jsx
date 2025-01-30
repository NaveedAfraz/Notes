import React from "react";
import Login from "./pages/login";
import Register from "./pages/register";
import "./index.css";
import { Theme } from "@radix-ui/themes";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthCheck from "./components/common/authCheck";
import Notes from "./pages/notes";
import HomesLayout from "./components/notesLayout/notesLayout";
import Home from "./pages/home";
import ForgotPassword from "./pages/forgotpassword";

function App() {
  const isauth = false;
  return (
    <Theme radius="large">
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/"
            element={
              <AuthCheck>
                <HomesLayout />
              </AuthCheck>
            }
          >
            <Route path="home" element={<Home />}></Route>
            <Route path="notes" element={<Notes />} />
          </Route>
        </Routes>
      </Router>
    </Theme>
  );
}

export default App;
