import React from 'react';
import PatientPage from './PatientPage';
import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom';
import NursePage from './NursePage';

function App() {
  return (
    <Router>
      <Routes>
      <Route exact path="/" element={<PatientPage/>} />
      <Route path="/NursePage" element={<NursePage/>} />
      </Routes>
    </Router>
  );
}

export default App;