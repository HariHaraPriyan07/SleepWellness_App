import { PrismaService } from '../prisma/prisma.service';
import { SubmitQuizDto, QuizResultResponseDto } from './dto/submit-quiz.dto';
export declare class QuizService {
    private prisma;
    constructor(prisma: PrismaService);
    submitQuiz(userId: string, submitQuizDto: SubmitQuizDto): Promise<QuizResultResponseDto>;
    private calculateSleepProfile;
    private getProfileDescription;
    private getRecommendations;
    getUserQuizHistory(userId: string): Promise<any>;
}
