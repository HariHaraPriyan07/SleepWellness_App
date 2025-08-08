import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { QuizAnswers } from './quiz.controller';

export interface QuizResult {
  profile: string;
  recommendations: {
    title: string;
    description: string;
    tips: string[];
  };
}

@Injectable()
export class QuizService {
  constructor(private prisma: PrismaService) {}

  async processQuiz(userId: string, answers: QuizAnswers): Promise<QuizResult> {
    // Determine sleep profile based on scoring logic
    const profile = this.determineSleepProfile(answers);
    
    // Store quiz result in database
    await this.storeQuizResult(userId, answers, profile);
    
    // Get recommendations for the determined profile
    const recommendations = await this.getRecommendations(profile);
    
    return {
      profile,
      recommendations,
    };
  }

  private determineSleepProfile(answers: QuizAnswers): string {
    const {
      screenTime,
      stressLevel,
      bedtime,
      sleepQuality,
      exerciseFrequency,
      caffeineIntake,
      sleepDuration,
    } = answers;

    // Convert bedtime to hour for easier comparison
    const bedtimeHour = parseInt(bedtime.split(':')[0]);
    const adjustedBedtimeHour = bedtimeHour > 12 ? bedtimeHour : bedtimeHour + 24;

    // Scoring logic for different sleep profiles
    let bluelightScore = 0;
    let stressScore = 0;
    let circadianScore = 0;

    // Blue Light Sensitive scoring
    if (screenTime >= 8) bluelightScore += 3;
    else if (screenTime >= 6) bluelightScore += 2;
    else if (screenTime >= 4) bluelightScore += 1;

    if (sleepQuality <= 4) bluelightScore += 2;
    else if (sleepQuality <= 6) bluelightScore += 1;

    if (sleepDuration < 6) bluelightScore += 1;

    // High-Stress Sleeper scoring
    if (stressLevel >= 8) stressScore += 3;
    else if (stressLevel >= 6) stressScore += 2;
    else if (stressLevel >= 4) stressScore += 1;

    if (sleepQuality <= 4) stressScore += 2;
    else if (sleepQuality <= 6) stressScore += 1;

    if (exerciseFrequency <= 2) stressScore += 1;
    if (caffeineIntake >= 4) stressScore += 1;

    // Circadian Rhythm Disrupted scoring
    if (adjustedBedtimeHour >= 26 || adjustedBedtimeHour <= 5) circadianScore += 3; // Very late or very early
    else if (adjustedBedtimeHour >= 25 || adjustedBedtimeHour <= 6) circadianScore += 2;
    else if (adjustedBedtimeHour >= 24 || adjustedBedtimeHour <= 7) circadianScore += 1;

    if (sleepDuration < 6 || sleepDuration > 9) circadianScore += 2;
    else if (sleepDuration < 7 || sleepDuration > 8) circadianScore += 1;

    if (sleepQuality <= 5) circadianScore += 1;

    // Determine profile based on highest score
    const maxScore = Math.max(bluelightScore, stressScore, circadianScore);

    if (maxScore < 3) {
      return 'General Sleeper';
    } else if (bluelightScore === maxScore) {
      return 'Blue Light Sensitive';
    } else if (stressScore === maxScore) {
      return 'High-Stress Sleeper';
    } else {
      return 'Circadian Rhythm Disrupted';
    }
  }

  private async storeQuizResult(
    userId: string,
    answers: QuizAnswers,
    profile: string,
  ): Promise<void> {
    await this.prisma.quizResult.create({
      data: {
        userId,
        answers: JSON.stringify(answers),
        profile,
        createdAt: new Date(),
      },
    });
  }

  private async getRecommendations(profile: string) {
    // Try to get recommendations from database first
    const dbRecommendation = await this.prisma.sleepRecommendation.findUnique({
      where: { profile },
    });

    if (dbRecommendation) {
      return {
        title: dbRecommendation.title,
        description: dbRecommendation.description,
        tips: JSON.parse(dbRecommendation.tips),
      };
    }

    // Fallback to hardcoded recommendations if database is empty
    return this.getHardcodedRecommendations(profile);
  }

  private getHardcodedRecommendations(profile: string) {
    const recommendations = {
      'Blue Light Sensitive': {
        title: 'Blue Light Management',
        description: 'Your sleep issues may be related to excessive blue light exposure, especially in the evening.',
        tips: [
          'Use blue light blocking glasses 2-3 hours before bedtime',
          'Enable night mode on all devices after sunset',
          'Avoid screens for at least 1 hour before sleep',
          'Use warm, dim lighting in the evening',
          'Consider blackout curtains or an eye mask',
        ],
      },
      'High-Stress Sleeper': {
        title: 'Stress Management for Better Sleep',
        description: 'High stress levels are likely impacting your sleep quality and duration.',
        tips: [
          'Practice relaxation techniques like deep breathing or meditation',
          'Establish a consistent bedtime routine',
          'Keep a journal to write down worries before bed',
          'Try progressive muscle relaxation',
          'Consider herbal teas like chamomile before bedtime',
          'Limit caffeine intake, especially after 2 PM',
        ],
      },
      'Circadian Rhythm Disrupted': {
        title: 'Circadian Rhythm Reset',
        description: 'Your sleep-wake cycle appears to be misaligned with your natural circadian rhythm.',
        tips: [
          'Maintain consistent sleep and wake times, even on weekends',
          'Get bright light exposure in the morning',
          'Avoid bright lights and screens 2-3 hours before bedtime',
          'Keep your bedroom cool, dark, and quiet',
          'Avoid large meals, caffeine, and alcohol close to bedtime',
          'Consider melatonin supplementation (consult a healthcare provider first)',
        ],
      },
      'General Sleeper': {
        title: 'General Sleep Hygiene',
        description: 'Your sleep patterns are generally healthy, but there\'s always room for improvement.',
        tips: [
          'Maintain a consistent sleep schedule',
          'Create a relaxing bedtime routine',
          'Keep your bedroom comfortable and conducive to sleep',
          'Stay physically active during the day',
          'Limit daytime naps to 20-30 minutes',
          'Avoid large meals and beverages close to bedtime',
        ],
      },
    };

    return recommendations[profile] || recommendations['General Sleeper'];
  }
}