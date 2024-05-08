import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import JournalHero from "./Components/JournalHero";
import DiaryHero from "./Components/DiaryHero";

function App() {
  return (
      <div className="App">
        <Router basename="MyDiary">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/journal" element={<JournalHero />} />
            <Route path="/journal/diaries" element={<DiaryHero />} />
          </Routes>
        </Router>
      </div>
  );
}

export default App;
