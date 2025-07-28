import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Result {
  color: string;
  icon: React.ReactNode;
  profile: string;
  description: string;
  recommendations: string[];
}

interface ResultCardProps {
  result: Result;
}

const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  const navigate = useNavigate();

  const handleRetakeQuiz = () => {
    navigate('/quiz');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Your Sleep Profile</h1>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            Based on your responses, here's your personalized sleep wellness analysis
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden mb-8">
          <div className={`bg-gradient-to-r ${result.color} p-8 text-white text-center`}>
            <div className="text-6xl mb-4">{result.icon}</div>
            <h2 className="text-3xl font-bold mb-2">{result.profile}</h2>
            <p className="text-lg opacity-90">{result.description}</p>
          </div>

          {/* Recommendations */}
          <div className="p-8">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
              <span className="mr-3">💡</span>
              Personalized Recommendations
            </h3>
            <div className="grid gap-4">
              {result.recommendations.map((recommendation, index) => (
                <div
                  key={index}
                  className="flex items-start p-4 bg-slate-50 dark:bg-slate-700 rounded-xl border border-slate-100 dark:border-slate-600 hover:border-indigo-200 dark:hover:border-indigo-400 transition-colors"
                >
                  <div className="w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 mt-0.5 flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-slate-700 dark:text-slate-200 font-medium">{recommendation}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleRetakeQuiz}
            className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
          >
            Retake Quiz
          </button>
          <button
            onClick={() => navigate('/')}
            className="px-8 py-4 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold rounded-xl border-2 border-slate-200 dark:border-slate-600 hover:border-indigo-300 dark:hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-slate-600 transition-all"
          >
            Back to Home
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700">
            <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              📊 Want to Track Your Progress?
            </h4>
            <p className="text-slate-600 dark:text-slate-300">
              Consider keeping a sleep diary and retaking this quiz monthly to monitor improvements in your sleep wellness journey.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
