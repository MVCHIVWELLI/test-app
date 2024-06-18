// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TestPage from './components/pages/TestPage';

const App: React.FC = () => {
  return (
    <Router>
    <Routes>
        <Route path="/" element={<TestPage/>} />
      </Routes>
    </Router>
  );
};

export default App;
