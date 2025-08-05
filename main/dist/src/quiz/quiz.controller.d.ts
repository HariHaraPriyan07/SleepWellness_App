import { QuizService } from './quiz.service';
import { SubmitQuizDto, QuizResultResponseDto } from './dto/submit-quiz.dto';
export declare class QuizController {
    private readonly quizService;
    constructor(quizService: QuizService);
    submitQuiz(req: any, submitQuizDto: SubmitQuizDto): Promise<QuizResultResponseDto>;
    getQuizHistory(req: any): Promise<any>;
    healthCheck(): Promise<{
        status: string;
        message: string;
        timestamp: string;
    }>;
}
