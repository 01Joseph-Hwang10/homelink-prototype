import { logger, region } from 'firebase-functions';

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = region('asia-northeast3').https.onCall(
  (data, context) => {
    logger.info('Hello logs!', { structuredData: true });
    return { text: 'Hello from Firebase Functions!' };
  }
);
