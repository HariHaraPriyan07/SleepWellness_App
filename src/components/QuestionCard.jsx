import React from 'react';

const QuestionCard = ({ question, answer, onAnswerChange, questionNumber, totalQuestions }) => {
  const handleInputChange = (value) => {
    onAnswerChange(question.id, value);
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 border border-slate-100 dark:border-slate-700 transition-all duration-300 hover:shadow-xl">
      {/* Progress indicator */}
      <div className="flex justify-between items-center mb-6">
        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
          Question {questionNumber} of {totalQuestions}
        </span>
        <div className="flex space-x-1">
          {Array.from({ length: totalQuestions }, (_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                i < questionNumber ? 'bg-indigo-500' : 'bg-slate-200 dark:bg-slate-600'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Question */}
      <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-6 leading-relaxed">
        {question.question}
      </h3>

      {/* Answer options */}
      <div className="space-y-3">
        {question.type === 'multiple-choice' ? (
          question.options.map((option) => (
            <label
              key={option.value}
              className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:border-indigo-300 hover:bg-indigo-50 ${
                answer === option.value
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                  : 'border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200'
              }`}
            >
              <input
                type="radio"
                name={`question-${question.id}`}
                value={option.value}
                checked={answer === option.value}
                onChange={(e) => handleInputChange(e.target.value)}
                className="sr-only"
              />
              <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center transition-colors ${
                answer === option.value
                  ? 'border-indigo-500 bg-indigo-500'
                  : 'border-slate-300 dark:border-slate-500'
              }`}>
                {answer === option.value && (
                  <div className="w-2.5 h-2.5 rounded-full bg-white" />
                )}
              </div>
              <span className="font-medium">{option.label}</span>
            </label>
          ))
        ) : (
          <div className="flex items-center space-x-4">
            <input
              type="number"
              min={question.min}
              max={question.max}
              value={answer || ''}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder={`Enter ${question.unit}`}
              className="flex-1 p-4 border-2 border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-xl focus:border-indigo-500 focus:outline-none transition-colors text-lg"
            />
            <span className="text-slate-600 dark:text-slate-300 font-medium">{question.unit}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionCard;