# SleepWellness Quiz Web

A NestJS backend API for the SleepWellness quiz application with JWT authentication via Okta, PostgreSQL database integration using Prisma ORM, and comprehensive sleep profile analysis.

## 🚀 Features

- **JWT Authentication**: Secure authentication using Okta JWT tokens
- **Sleep Profile Analysis**: Intelligent scoring system to classify users into 4 sleep profiles
- **Database Integration**: PostgreSQL with Prisma ORM for data persistence
- **Personalized Recommendations**: Hardcoded sleep recommendations based on user profiles
- **Clean Architecture**: Modular structure with DTOs, services, and controllers
- **Validation**: Request validation using class-validator
- **CORS Support**: Configured for frontend integration

## 📋 Sleep Profiles

The API classifies users into one of these sleep profiles based on their quiz responses:

1. **Blue Light Sensitive** - Affected by electronic device usage before bedtime
2. **High-Stress Sleeper** - Sleep disrupted by stress and anxiety
3. **Circadian Rhythm Disrupted** - Natural sleep-wake cycle issues
4. **General Sleeper** - Good sleep habits with minor room for improvement

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- Okta developer account

### 1. Clone and Install Dependencies

```bash
git clone <repository-url>
cd sleepwellness-api
npm install
```

### 2. Environment Configuration

Copy the `.env` file and update with your actual values:

```bash
cp .env .env.local
```

Update the following variables in `.env`:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/sleepwellness_db?schema=public"

# Okta Configuration
OKTA_DOMAIN="https://your-okta-domain.okta.com"
OKTA_CLIENT_ID="your-okta-client-id"
OKTA_AUDIENCE="api://default"

# JWT Configuration
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
```

### 3. Database Setup

```bash
# Generate Prisma client
npm run prisma:generate

# Push schema to database (for development)
npm run prisma:push

# Or run migrations (for production)
npm run prisma:migrate

# Optional: Open Prisma Studio to view data
npm run prisma:studio
```

### 4. Seed Database (Optional)

You can manually add sleep recommendations to the database:

```sql
INSERT INTO sleep_recommendations (id, profile, title, description, tips) VALUES
('blue-light', 'Blue Light Sensitive', 'Blue Light Management', 'Focus on reducing blue light exposure', '["Use blue light blocking glasses", "Install blue light filters", "Create no screens rule"]'),
('high-stress', 'High-Stress Sleeper', 'Stress Reduction', 'Implement stress management techniques', '["Practice deep breathing", "Try meditation", "Keep a worry journal"]'),
('circadian', 'Circadian Rhythm Disrupted', 'Circadian Reset', 'Realign your sleep-wake cycle', '["Maintain consistent sleep times", "Get morning light exposure", "Avoid evening bright lights"]'),
('general', 'General Sleeper', 'Sleep Optimization', 'Fine-tune your sleep habits', '["Maintain current schedule", "Optimize sleep environment", "Try gentle stretching"]');
```

### 5. Start the Application

```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

The API will be available at `http://localhost:3000`

## 📡 API Endpoints

### Health Check
```http
GET /quiz/health
```

### Submit Quiz
```http
POST /quiz/submit
Authorization: Bearer <okta-jwt-token>
Content-Type: application/json

{
  "answers": [
    {
      "questionId": 1,
      "answer": "before-10"
    },
    {
      "questionId": 2,
      "answer": "under-15"
    },
    {
      "questionId": 3,
      "answer": "8"
    },
    {
      "questionId": 4,
      "answer": "never"
    },
    {
      "questionId": 5,
      "answer": "excellent"
    },
    {
      "questionId": 6,
      "answer": "rarely"
    }
  ]
}
```

### Get Quiz History
```http
GET /quiz/history
Authorization: Bearer <okta-jwt-token>
```

## 🧪 Testing with cURL

### Submit Quiz Example

```bash
curl -X POST http://localhost:3000/quiz/submit \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_OKTA_JWT_TOKEN" \
  -d '{
    "answers": [
      {
        "questionId": 1,
        "answer": "11-12"
      },
      {
        "questionId": 2,
        "answer": "30-60"
      },
      {
        "questionId": 3,
        "answer": "6"
      },
      {
        "questionId": 4,
        "answer": "daily"
      },
      {
        "questionId": 5,
        "answer": "fair"
      },
      {
        "questionId": 6,
        "answer": "frequently"
      }
    ]
  }'
```

### Health Check

```bash
curl -X GET http://localhost:3000/quiz/health
```

## 📊 Response Format

### Quiz Submit Response

```json
{
  "id": "clxxx123456789",
  "sleepProfile": "High-Stress Sleeper",
  "totalScore": 8,
  "profileDescription": "Stress and anxiety are primary factors affecting your sleep quality and ability to fall asleep.",
  "recommendations": {
    "title": "Stress Reduction & Relaxation",
    "description": "Implement stress management techniques and create a calming bedtime routine.",
    "tips": [
      "Practice deep breathing exercises or meditation before bed",
      "Try progressive muscle relaxation techniques",
      "Keep a worry journal to clear your mind before sleep",
      "Establish a consistent, calming bedtime routine",
      "Consider chamomile tea or other natural relaxants",
      "Limit caffeine intake, especially after 2 PM",
      "Create a comfortable, cool sleep environment (65-68°F)"
    ]
  },
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

## 🏗️ Project Structure

```
src/
├── auth/
│   ├── auth.module.ts
│   ├── jwt-auth.guard.ts
│   └── jwt.strategy.ts
├── prisma/
│   ├── prisma.module.ts
│   └── prisma.service.ts
├── quiz/
│   ├── dto/
│   │   └── submit-quiz.dto.ts
│   ├── quiz.controller.ts
│   ├── quiz.module.ts
│   └── quiz.service.ts
├── app.module.ts
└── main.ts

prisma/
└── schema.prisma
```

## 🔒 Security Features

- JWT token validation via Okta
- Request validation using DTOs
- CORS configuration
- Environment variable protection
- Database query protection via Prisma

## 🚀 Deployment

For production deployment:

1. Set `NODE_ENV=production`
2. Use proper database credentials
3. Configure proper CORS origins
4. Use secure JWT secrets
5. Enable HTTPS
6. Set up proper logging

## 📝 License

This project is licensed under the MIT License.
