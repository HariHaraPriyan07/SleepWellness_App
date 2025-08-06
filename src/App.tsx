import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import ThemeToggle from './components/ThemeToggle.jsx';
import Home from './pages/Home';
import QuizPage from './pages/QuizPage';
import ResultPage from './pages/ResultPage';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen">
          <ThemeToggle />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/result" element={<ResultPage />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;