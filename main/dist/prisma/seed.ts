import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding SleepRecommendation data...');

  // Seed Blue Light Sensitive recommendations
  await prisma.sleepRecommendation.upsert({
    where: { profile: 'Blue Light Sensitive' },
    update: {},
    create: {
      profile: 'Blue Light Sensitive',
      title: 'Blue Light Management',
      description: 'Your sleep issues may be related to excessive blue light exposure, especially in the evening.',
      tips: JSON.stringify([
        'Use blue light blocking glasses 2-3 hours before bedtime',
        'Enable night mode on all devices after sunset',
        'Avoid screens for at least 1 hour before sleep',
        'Use warm, dim lighting in the evening',
        'Consider blackout curtains or an eye mask',
        'Try reading a physical book instead of using electronic devices',
      ]),
    },
  });

  // Seed High-Stress Sleeper recommendations
  await prisma.sleepRecommendation.upsert({
    where: { profile: 'High-Stress Sleeper' },
    update: {},
    create: {
      profile: 'High-Stress Sleeper',
      title: 'Stress Management for Better Sleep',
      description: 'High stress levels are likely impacting your sleep quality and duration.',
      tips: JSON.stringify([
        'Practice relaxation techniques like deep breathing or meditation',
        'Establish a consistent bedtime routine',
        'Keep a journal to write down worries before bed',
        'Try progressive muscle relaxation',
        'Consider herbal teas like chamomile before bedtime',
        'Limit caffeine intake, especially after 2 PM',
        'Exercise regularly, but not close to bedtime',
      ]),
    },
  });

  // Seed Circadian Rhythm Disrupted recommendations
  await prisma.sleepRecommendation.upsert({
    where: { profile: 'Circadian Rhythm Disrupted' },
    update: {},
    create: {
      profile: 'Circadian Rhythm Disrupted',
      title: 'Circadian Rhythm Reset',
      description: 'Your sleep-wake cycle appears to be misaligned with your natural circadian rhythm.',
      tips: JSON.stringify([
        'Maintain consistent sleep and wake times, even on weekends',
        'Get bright light exposure in the morning',
        'Avoid bright lights and screens 2-3 hours before bedtime',
        'Keep your bedroom cool, dark, and quiet',
        'Avoid large meals, caffeine, and alcohol close to bedtime',
        'Consider melatonin supplementation (consult a healthcare provider first)',
        'Create a wind-down routine 1-2 hours before bed',
      ]),
    },
  });

  // Seed General Sleeper recommendations
  await prisma.sleepRecommendation.upsert({
    where: { profile: 'General Sleeper' },
    update: {},
    create: {
      profile: 'General Sleeper',
      title: 'General Sleep Hygiene',
      description: 'Your sleep patterns are generally healthy, but there\'s always room for improvement.',
      tips: JSON.stringify([
        'Maintain a consistent sleep schedule',
        'Create a relaxing bedtime routine',
        'Keep your bedroom comfortable and conducive to sleep',
        'Stay physically active during the day',
        'Limit daytime naps to 20-30 minutes',
        'Avoid large meals and beverages close to bedtime',
        'Use your bedroom only for sleep and relaxation',
      ]),
    },
  });

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });