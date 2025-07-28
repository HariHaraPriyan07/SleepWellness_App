import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import ResultCard from '../components/ResultCard';

const ResultPage = () => {
  const location = useLocation();
  
  // Redirect to home if no result data
  if (!location.state || !location.state.result) {
    return <Navigate to="/" replace />;
  }

  return <ResultCard result={location.state.result} />;
};

export default ResultPage;