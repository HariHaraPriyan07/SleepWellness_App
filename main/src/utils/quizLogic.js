import { quizQuestions } from '../data/questions';

export const calculateSleepProfile = (answers) => {
  // Calculate total score from multiple choice questions
  let totalScore = 0;
  let maxPossibleScore = 0;
  
  answers.forEach((answer, index) => {
    const question = quizQuestions[index];
    
    if (question.type === 'multiple-choice') {
      const selectedOption = question.options.find(opt => opt.value === answer);
      if (selectedOption) {
        totalScore += selectedOption.score;
      }
      maxPossibleScore += Math.max(...question.options.map(opt => opt.score));
    } else if (question.type === 'numeric') {
      // For sleep hours, ideal is 7-9 hours
      const hours = parseInt(answer);
      if (hours >= 7 && hours <= 9) {
        totalScore += 3;
      } else if (hours >= 6 && hours <= 10) {
        totalScore += 2;
      } else if (hours >= 5 && hours <= 11) {
        totalScore += 1;
      }
      maxPossibleScore += 3;
    }
  });
  
  const scorePercentage = (totalScore / maxPossibleScore) * 100;
  
  // Determine sleep profile based on score
  if (scorePercentage >= 80) {
    return {
      profile: 'Optimal Sleeper',
      description: 'You have excellent sleep habits and maintain a healthy sleep routine. Your sleep patterns support optimal physical and mental well-being.',
      color: 'from-green-400 to-emerald-500',
      icon: '🌟',
      recommendations: [
        'Maintain your current sleep schedule',
        'Continue avoiding screens before bedtime',
        'Keep your bedroom cool and dark',
        'Consider meditation or light stretching before bed'
      ]
    };
  } else if (scorePercentage >= 60) {
    return {
      profile: 'Good Sleeper',
      description: 'You have generally good sleep habits with some room for improvement. Small adjustments could enhance your sleep quality significantly.',
      color: 'from-blue-400 to-indigo-500',
      icon: '😊',
      recommendations: [
        'Try to maintain a consistent bedtime schedule',
        'Reduce screen time 1 hour before bed',
        'Create a relaxing bedtime routine',
        'Consider blackout curtains or eye mask',
        'Limit caffeine intake after 2 PM'
      ]
    };
  } else if (scorePercentage >= 40) {
    return {
      profile: 'Restless Sleeper',
      description: 'Your sleep patterns show signs of disruption. Implementing better sleep hygiene practices could greatly improve your rest quality.',
      color: 'from-yellow-400 to-orange-500',
      icon: '😴',
      recommendations: [
        'Establish a consistent sleep schedule',
        'Create a technology-free bedroom environment',
        'Practice relaxation techniques before bed',
        'Avoid large meals and caffeine before bedtime',
        'Consider keeping a sleep diary',
        'Exercise regularly, but not close to bedtime'
      ]
    };
  } else {
    return {
      profile: 'Sleep-Challenged',
      description: 'Your sleep habits may be significantly impacting your well-being. Consider making substantial changes to improve your sleep quality.',
      color: 'from-red-400 to-pink-500',
      icon: '😓',
      recommendations: [
        'Consult with a healthcare provider about sleep issues',
        'Implement a strict sleep schedule',
        'Remove all electronic devices from the bedroom',
        'Try stress-reduction techniques like meditation',
        'Consider sleep hygiene education',
        'Evaluate your sleep environment for improvements',
        'Limit daytime naps if you take them'
      ]
    };
  }
};

export const mockApiCall = (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const result = calculateSleepProfile(data);
      resolve(result);
    }, 1500); // Simulate API delay
  });
};