import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { QuizService } from './quiz.service';

export interface QuizAnswers {
  screenTime: number; // hours per day
  stressLevel: number; // 1-10 scale
  bedtime: string; // e.g., "23:00"
  sleepQuality: number; // 1-10 scale
  exerciseFrequency: number; // days per week
  caffeineIntake: number; // cups per day
  sleepDuration: number; // hours per night
}

@Controller('quiz')
@UseGuards(JwtAuthGuard)
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post('submit')
  async submitQuiz(@Body() quizAnswers: QuizAnswers, @Request() req) {
    const userId = req.user.sub; // Okta user ID from JWT token
    
    const result = await this.quizService.processQuiz(userId, quizAnswers);
    
    return {
      success: true,
      profile: result.profile,
      recommendations: result.recommendations,
      message: 'Quiz submitted successfully and sleep profile determined',
    };
  }
}