/*
My Todo App

This is a conventional todo application for browser use. You can add and
remove any tasks you want under the 'Home' tab. The application
saves the state of your tasks for future use even if you close the
browser.

All material used in this application is owned by the author.

© 2021 All rights reserved.

Author: Joni Mäkinen
*/

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home.js";
import Info from "./Info.js";
import Calendar from "./Calendar.js";
import Navigation from "./Navigation.js";
import "./App.css";

export default function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/" element={<Home />} />
        <Route path="/info" element={<Info />} />
      </Routes>
    </Router>
  );
}
