
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RedirectPage from './pages/RedirectPage';

function App() {
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