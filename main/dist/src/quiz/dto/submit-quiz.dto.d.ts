export declare class QuizAnswerDto {
    questionId: number;
    answer: string;
    score?: number;
}
export declare class SubmitQuizDto {
    answers: QuizAnswerDto[];
}
export declare class QuizResultResponseDto {
    id: string;
    sleepProfile: string;
    totalScore: number;
    profileDescription: string;
    recommendations: {
        title: string;
        description: string;
        tips: string[];
    };
    createdAt: Date;
}
