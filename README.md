# AptiMaster

AptiMaster is a dark-theme, gamified aptitude preparation app built with Expo, React Navigation, Firebase Authentication, and Firestore.

## Run

```bash
npm install
npx expo start
```

## Firebase Setup

1. Create a Firebase project at <https://console.firebase.google.com>.
2. Enable Authentication providers:
   - Email/Password
   - Google
3. Create a Cloud Firestore database.
4. Copy your web app Firebase config into `services/firebase.js`.
5. For Google Sign-In, create OAuth client IDs and place them in `GOOGLE_CLIENT_IDS` inside `services/firebase.js`.
6. Add your Expo redirect URI in Google Cloud OAuth settings. During development, Expo shows this URI in the terminal when auth opens.

Firestore stores user data under:

```text
users/{uid}
users/{uid}/attempts/{attemptId}
```

## Project Structure

```text
/components       Shared UI components
/data             Aptitude sections, topics, sample questions, sample tests
/navigation       Stack and tab navigation
/screens          Login, signup, dashboard, section, topic, quiz, result, tests, progress
/services         Firebase config, auth helpers, Firestore progress helpers
```

## Notes

The app includes sample questions for all four aptitude sections. Replace or expand `data/questions.js` with your production question bank when ready.
