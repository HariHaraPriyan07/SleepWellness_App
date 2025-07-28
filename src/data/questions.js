export const quizQuestions = [
  {
    id: 1,
    type: 'multiple-choice',
    question: 'What time do you usually go to bed on weeknights?',
    options: [
      { value: 'before-10', label: 'Before 10:00 PM', score: 3 },
      { value: '10-11', label: '10:00 - 11:00 PM', score: 2 },
      { value: '11-12', label: '11:00 PM - 12:00 AM', score: 1 },
      { value: 'after-12', label: 'After 12:00 AM', score: 0 }
    ]
  },
  {
    id: 2,
    type: 'multiple-choice',
    question: 'How long does it typically take you to fall asleep?',
    options: [
      { value: 'under-15', label: 'Less than 15 minutes', score: 3 },
      { value: '15-30', label: '15-30 minutes', score: 2 },
      { value: '30-60', label: '30-60 minutes', score: 1 },
      { value: 'over-60', label: 'More than 60 minutes', score: 0 }
    ]
  },
  {
    id: 3,
    type: 'numeric',
    question: 'How many hours of sleep do you get on average per night?',
    min: 3,
    max: 12,
    unit: 'hours'
  },
  {
    id: 4,
    type: 'multiple-choice',
    question: 'How often do you use electronic devices (phone, tablet, TV) within 1 hour before bed?',
    options: [
      { value: 'never', label: 'Never', score: 3 },
      { value: 'rarely', label: 'Rarely (1-2 times/week)', score: 2 },
      { value: 'sometimes', label: 'Sometimes (3-4 times/week)', score: 1 },
      { value: 'daily', label: 'Daily', score: 0 }
    ]
  },
  {
    id: 5,
    type: 'multiple-choice',
    question: 'How would you rate your overall sleep quality?',
    options: [
      { value: 'excellent', label: 'Excellent - I wake up refreshed', score: 3 },
      { value: 'good', label: 'Good - Generally well-rested', score: 2 },
      { value: 'fair', label: 'Fair - Sometimes tired', score: 1 },
      { value: 'poor', label: 'Poor - Often exhausted', score: 0 }
    ]
  },
  {
    id: 6,
    type: 'multiple-choice',
    question: 'How often do you experience stress or anxiety that affects your sleep?',
    options: [
      { value: 'never', label: 'Never', score: 3 },
      { value: 'rarely', label: 'Rarely', score: 2 },
      { value: 'sometimes', label: 'Sometimes', score: 1 },
      { value: 'frequently', label: 'Frequently', score: 0 }
    ]
  }
];