import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RedirectPage from './pages/RedirectPage';

function App() {
  console.log('App component rendering'); // Add this for debugging
  console.log(import.meta.env.SERVER_BASE_URL)
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/s/:id" element={<RedirectPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;