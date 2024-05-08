import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import JournalHero from "./Components/JournalHero";

function App() {
  return (
      <div className="App">
        <Router basename="MyDiary">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/journal" element={<JournalHero />} />
          </Routes>
        </Router>
      </div>
  );
}

export default App;
