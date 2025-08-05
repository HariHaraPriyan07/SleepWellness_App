import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionCard from './QuestionCard';
import { quizQuestions } from '../data/questions';
import { mockApiCall } from '../utils/quizLogic';

const QuizForm = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    const answersArray = quizQuestions.map(q => answers[q.id] || '');
    setIsLoading(true);

    try {
      const result = await mockApiCall(answersArray);
      navigate('/result', { state: { result, answers: answersArray } });
    } catch (error) {
      console.error('Error submitting quiz:', error);
      setIsLoading(false);
    }
  };

  const isCurrentAnswered = answers[quizQuestions[currentQuestion].id];
  const isLastQuestion = currentQuestion === quizQuestions.length - 1;
  const answeredCount = Object.keys(answers).length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-12 text-center max-w-md mx-4">
          <div className="animate-spin w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mb-6"></div>
          <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">Analyzing Your Sleep Patterns</h3>
          <p className="text-slate-600 dark:text-slate-300">Please wait while we generate your personalized sleep profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Sleep Wellness Quiz</h1>
          <p className="text-slate-600 dark:text-slate-300">
            Answer honestly to get your personalized sleep profile
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">
            <span>Progress</span>
            <span>{Math.round(((currentQuestion + 1) / quizQuestions.length) * 100)}%</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <QuestionCard
          question={quizQuestions[currentQuestion]}
          answer={answers[quizQuestions[currentQuestion].id]}
          onAnswerChange={handleAnswerChange}
          questionNumber={currentQuestion + 1}
          totalQuestions={quizQuestions.length}
        />

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              currentQuestion === 0
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-600 shadow-md border border-slate-200 dark:border-slate-600'
            }`}
          >
            Previous
          </button>

          <div className="text-center">
            <span className="text-sm text-slate-500 dark:text-slate-400">
              {answeredCount} of {quizQuestions.length} answered
            </span>
          </div>

          {/* Fixed ternary */}
          <>
            {isLastQuestion ? (
              <button
                onClick={handleSubmit}
                disabled={!isCurrentAnswered}
                className={`px-8 py-3 rounded-xl font-medium transition-all ${
                  isCurrentAnswered
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 shadow-lg'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                Get My Results
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={!isCurrentAnswered}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  isCurrentAnswered
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 shadow-lg'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                Next
              </button>
            )}
          </>
        </div>
      </div>
    </div>
  );
};

export default QuizForm;
