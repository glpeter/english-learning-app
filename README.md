# English Learning App - A2 Exercises

A React Native/Expo application for practicing A2 level English exercises with interactive voice synthesis.

## Features

- **Interactive A2 English Exercises**: Practice Present Simple, Present Continuous, Past Simple, and Past Continuous
- **Text-to-Speech**: Tap on questions and options to hear pronunciation
- **Alternating Voices**: Automatically cycles between British and American English accents
- **Progress Tracking**: See your score and question progress
- **Mobile Friendly**: Designed for mobile devices with touch interaction

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Run on specific platform:
```bash
npm run android  # For Android
npm run ios      # For iOS  
npm run web      # For Web
```

## Project Structure

- `src/screens/ExercisesScreen/ExercisesA2Quiz.tsx` - Main quiz component
- `src/screens/ExercisesScreen/exercisesA2.json` - Exercise data
- `App.tsx` - Main application entry point

## Exercise Data Format

The exercises are stored in JSON format with the following structure:

```json
{
  "present_simple": [
    {
      "question": "I ___ (have) a cat.",
      "options": ["have", "has"],
      "answer": "have"
    }
  ]
}
```

## Voice Features

- **British English**: Uses en-GB locale
- **American English**: Uses en-US locale
- **Automatic Alternation**: Voices alternate between British/American accents for variety
- **Tap-to-Hear**: Click/tap any question or answer option to hear it spoken aloud

## Dependencies

- **expo**: React Native framework
- **expo-speech**: Text-to-speech functionality
- **react-native**: Core React Native framework