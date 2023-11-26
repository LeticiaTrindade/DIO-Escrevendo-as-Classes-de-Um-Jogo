import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/DIO-escrevendo-as-classes-de-um-jogo" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
