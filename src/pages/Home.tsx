import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Moon, Star, Heart, Clock } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    navigate('/quiz');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center">
            {/* Logo/Icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl mb-8 shadow-xl">
              <Moon className="w-10 h-10 text-white" />
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
              Sleep<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Wellness</span>
              <br />
              Quiz
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Discover your unique sleep profile and get personalized recommendations 
              to improve your sleep quality and overall well-being.
            </p>

            {/* CTA Button */}
            <button
              onClick={handleStartQuiz}
              className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xl font-semibold rounded-2xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1"
            >
              Start Your Sleep Assessment
              <Star className="ml-3 w-6 h-6" />
            </button>

            <p className="text-slate-500 dark:text-slate-400 mt-4 text-sm">
              Takes only 3-5 minutes • Get instant results
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-all duration-300 group">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Clock className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Quick Assessment</h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Answer 6 carefully crafted questions about your sleep habits, bedtime routine, and sleep quality in just a few minutes.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-all duration-300 group">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Star className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Personalized Profile</h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Receive a detailed sleep profile that identifies your sleep type and highlights areas for improvement in your routine.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-all duration-300 group">
            <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Heart className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Actionable Tips</h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Get science-backed recommendations tailored to your specific sleep challenges and lifestyle preferences.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Why Sleep Wellness Matters
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Quality sleep is fundamental to your health and happiness
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold text-indigo-600 mb-2">1/3</div>
              <p className="text-slate-600 dark:text-slate-300">of adults don't get enough quality sleep</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-purple-600 mb-2">7-9</div>
              <p className="text-slate-600 dark:text-slate-300">hours is the recommended sleep duration</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-blue-600 mb-2">50%</div>
              <p className="text-slate-600 dark:text-slate-300">improvement in mood with better sleep</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;