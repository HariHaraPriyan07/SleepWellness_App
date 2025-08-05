"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let QuizService = class QuizService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async submitQuiz(userId, submitQuizDto) {
        const { answers } = submitQuizDto;
        const { sleepProfile, totalScore } = this.calculateSleepProfile(answers);
        const quizResult = await this.prisma.quizResult.create({
            data: {
                userId,
                answers: answers,
                sleepProfile,
                totalScore,
            },
        });
        const recommendations = this.getRecommendations(sleepProfile);
        return {
            id: quizResult.id,
            sleepProfile,
            totalScore,
            profileDescription: this.getProfileDescription(sleepProfile),
            recommendations,
            createdAt: quizResult.createdAt,
        };
    }
    calculateSleepProfile(answers) {
        let totalScore = 0;
        let bluelightScore = 0;
        let stressScore = 0;
        let circadianScore = 0;
        answers.forEach((answer, index) => {
            const questionId = answer.questionId || index + 1;
            const value = answer.answer;
            switch (questionId) {
                case 1:
                    if (value === 'before-10')
                        totalScore += 3;
                    else if (value === '10-11')
                        totalScore += 2;
                    else if (value === '11-12')
                        totalScore += 1;
                    else
                        circadianScore += 2;
                    break;
                case 2:
                    if (value === 'under-15')
                        totalScore += 3;
                    else if (value === '15-30')
                        totalScore += 2;
                    else if (value === '30-60') {
                        totalScore += 1;
                        stressScore += 1;
                    }
                    else {
                        stressScore += 3;
                    }
                    break;
                case 3:
                    const hours = parseInt(value) || 0;
                    if (hours >= 7 && hours <= 9)
                        totalScore += 3;
                    else if (hours >= 6 && hours <= 10)
                        totalScore += 2;
                    else if (hours >= 5 && hours <= 11)
                        totalScore += 1;
                    else
                        circadianScore += 2;
                    break;
                case 4:
                    if (value === 'never')
                        totalScore += 3;
                    else if (value === 'rarely')
                        totalScore += 2;
                    else if (value === 'sometimes') {
                        totalScore += 1;
                        bluelightScore += 1;
                    }
                    else {
                        bluelightScore += 3;
                    }
                    break;
                case 5:
                    if (value === 'excellent')
                        totalScore += 3;
                    else if (value === 'good')
                        totalScore += 2;
                    else if (value === 'fair')
                        totalScore += 1;
                    else
                        stressScore += 2;
                    break;
                case 6:
                    if (value === 'never')
                        totalScore += 3;
                    else if (value === 'rarely')
                        totalScore += 2;
                    else if (value === 'sometimes') {
                        totalScore += 1;
                        stressScore += 1;
                    }
                    else {
                        stressScore += 3;
                    }
                    break;
            }
        });
        let sleepProfile = 'General Sleeper';
        if (bluelightScore >= 3) {
            sleepProfile = 'Blue Light Sensitive';
        }
        else if (stressScore >= 4) {
            sleepProfile = 'High-Stress Sleeper';
        }
        else if (circadianScore >= 3) {
            sleepProfile = 'Circadian Rhythm Disrupted';
        }
        return { sleepProfile, totalScore };
    }
    getProfileDescription(profile) {
        const descriptions = {
            'Blue Light Sensitive': 'Your sleep is significantly affected by electronic device usage and blue light exposure before bedtime.',
            'High-Stress Sleeper': 'Stress and anxiety are primary factors affecting your sleep quality and ability to fall asleep.',
            'Circadian Rhythm Disrupted': 'Your natural sleep-wake cycle appears to be disrupted, affecting your sleep timing and quality.',
            'General Sleeper': 'You have relatively good sleep habits with room for minor improvements in your sleep routine.',
        };
        return descriptions[profile] || descriptions['General Sleeper'];
    }
    getRecommendations(profile) {
        const recommendations = {
            'Blue Light Sensitive': {
                title: 'Blue Light Management',
                description: 'Focus on reducing blue light exposure and creating a technology-free sleep environment.',
                tips: [
                    'Use blue light blocking glasses 2-3 hours before bedtime',
                    'Install blue light filters on all devices (f.lux, Night Shift)',
                    'Create a "no screens" rule 1 hour before bed',
                    'Replace LED bulbs with warm light bulbs in the bedroom',
                    'Consider blackout curtains to eliminate external light sources',
                    'Try reading a physical book instead of using devices before bed'
                ]
            },
            'High-Stress Sleeper': {
                title: 'Stress Reduction & Relaxation',
                description: 'Implement stress management techniques and create a calming bedtime routine.',
                tips: [
                    'Practice deep breathing exercises or meditation before bed',
                    'Try progressive muscle relaxation techniques',
                    'Keep a worry journal to clear your mind before sleep',
                    'Establish a consistent, calming bedtime routine',
                    'Consider chamomile tea or other natural relaxants',
                    'Limit caffeine intake, especially after 2 PM',
                    'Create a comfortable, cool sleep environment (65-68°F)'
                ]
            },
            'Circadian Rhythm Disrupted': {
                title: 'Circadian Rhythm Reset',
                description: 'Realign your natural sleep-wake cycle through consistent timing and light exposure.',
                tips: [
                    'Maintain consistent sleep and wake times, even on weekends',
                    'Get bright light exposure within 30 minutes of waking',
                    'Avoid bright lights 2-3 hours before your target bedtime',
                    'Consider light therapy if you have seasonal sleep issues',
                    'Limit daytime naps or keep them under 20 minutes',
                    'Avoid large meals, alcohol, and caffeine close to bedtime',
                    'Gradually shift your bedtime earlier by 15 minutes each night'
                ]
            },
            'General Sleeper': {
                title: 'Sleep Optimization',
                description: 'Fine-tune your already good sleep habits for optimal rest and recovery.',
                tips: [
                    'Maintain your current consistent sleep schedule',
                    'Optimize your sleep environment (cool, dark, quiet)',
                    'Consider a white noise machine if you\'re sensitive to sounds',
                    'Try gentle stretching or yoga before bed',
                    'Ensure your mattress and pillows are comfortable and supportive',
                    'Keep your bedroom temperature between 65-68°F',
                    'Limit fluid intake 2 hours before bedtime to avoid disruptions'
                ]
            }
        };
        return recommendations[profile] || recommendations['General Sleeper'];
    }
    async getUserQuizHistory(userId) {
        return this.prisma.quizResult.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            take: 10,
        });
    }
};
exports.QuizService = QuizService;
exports.QuizService = QuizService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], QuizService);
//# sourceMappingURL=quiz.service.js.map