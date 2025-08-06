import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import * as Speech from 'expo-speech';
import exercisesData from './exercisesA2.json';

interface Exercise {
  question: string;
  options: string[];
  answer: string;
}

interface VoiceConfig {
  language: string;
  name?: string;
}

const ExercisesA2Quiz: React.FC = () => {
  const [currentTopicIndex, setCurrentTopicIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [voiceIndex, setVoiceIndex] = useState(0);

  // Voice configurations alternating between en-GB/en-US and male/female
  const voiceConfigs: VoiceConfig[] = [
    { language: 'en-GB' }, // British male (default)
    { language: 'en-US' }, // American male (default)
    { language: 'en-GB' }, // British female (we'll try to use a female voice if available)
    { language: 'en-US' }, // American female (we'll try to use a female voice if available)
  ];

  // Get all topics and exercises
  const topics = Object.keys(exercisesData) as Array<keyof typeof exercisesData>;
  const currentTopic = topics[currentTopicIndex];
  const currentExercises = exercisesData[currentTopic];
  const currentExercise = currentExercises[currentQuestionIndex];

  // Get current voice configuration
  const getCurrentVoice = (): VoiceConfig => {
    return voiceConfigs[voiceIndex % voiceConfigs.length];
  };

  // Text-to-speech function
  const speakText = async (text: string) => {
    try {
      setIsLoading(true);
      
      // Stop any current speech
      await Speech.stop();
      
      const voice = getCurrentVoice();
      
      // Speak with the current voice configuration
      await Speech.speak(text, {
        language: voice.language,
        pitch: voice.language.includes('GB') ? 1.0 : 1.1, // Slightly different pitch for variety
        rate: 0.8, // Slower rate for learning
        voice: voice.name,
      });
      
      // Cycle to next voice for next speech
      setVoiceIndex(prev => (prev + 1) % voiceConfigs.length);
    } catch (error) {
      console.error('Error speaking text:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle answer selection
  const handleAnswerSelect = (option: string) => {
    setSelectedAnswer(option);
    
    // Check if answer is correct
    if (option === currentExercise.answer) {
      setScore(prev => prev + 1);
    }
    
    // Show result and move to next question after a delay
    setShowResult(true);
    setTimeout(() => {
      moveToNextQuestion();
    }, 1500);
  };

  // Move to next question or topic
  const moveToNextQuestion = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    
    if (currentQuestionIndex < currentExercises.length - 1) {
      // Next question in current topic
      setCurrentQuestionIndex(prev => prev + 1);
    } else if (currentTopicIndex < topics.length - 1) {
      // Next topic
      setCurrentTopicIndex(prev => prev + 1);
      setCurrentQuestionIndex(0);
    } else {
      // Quiz completed
      Alert.alert(
        'Quiz Completed!',
        `Your final score: ${score + (selectedAnswer === currentExercise.answer ? 1 : 0)} out of ${getTotalQuestions()}`,
        [{ text: 'Restart', onPress: restartQuiz }]
      );
    }
  };

  // Get total number of questions
  const getTotalQuestions = (): number => {
    return topics.reduce((total, topic) => total + exercisesData[topic].length, 0);
  };

  // Get current question number
  const getCurrentQuestionNumber = (): number => {
    let questionNumber = 1;
    for (let i = 0; i < currentTopicIndex; i++) {
      questionNumber += exercisesData[topics[i]].length;
    }
    return questionNumber + currentQuestionIndex;
  };

  // Restart quiz
  const restartQuiz = () => {
    setCurrentTopicIndex(0);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setVoiceIndex(0);
  };

  // Format topic name for display
  const formatTopicName = (topic: string): string => {
    return topic.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>A2 English Exercises</Text>
        <Text style={styles.topicTitle}>{formatTopicName(currentTopic)}</Text>
        <Text style={styles.progress}>
          Question {getCurrentQuestionNumber()} of {getTotalQuestions()} | Score: {score}
        </Text>
      </View>

      <View style={styles.questionContainer}>
        <TouchableOpacity
          style={styles.questionButton}
          onPress={() => speakText(currentExercise.question)}
          disabled={isLoading}
        >
          <Text style={styles.questionText}>{currentExercise.question}</Text>
          {isLoading && <ActivityIndicator size="small" color="#007AFF" style={styles.loader} />}
          <Text style={styles.tapHint}>Tap to hear question</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.optionsContainer}>
        {currentExercise.options.map((option, index) => {
          const isCorrect = showResult && option === currentExercise.answer;
          const isIncorrect = showResult && option === selectedAnswer && option !== currentExercise.answer;
          const isSelected = selectedAnswer === option && !showResult;
          
          const buttonStyle = [
            styles.optionButton,
            isCorrect && styles.correctOption,
            isIncorrect && styles.incorrectOption,
            isSelected && styles.selectedOption,
          ].filter(Boolean);
          
          const textStyle = [
            styles.optionText,
            isCorrect && styles.correctOptionText,
            isIncorrect && styles.incorrectOptionText,
            isSelected && styles.selectedOptionText,
          ].filter(Boolean);

          return (
            <TouchableOpacity
              key={index}
              style={buttonStyle}
              onPress={() => {
                if (!showResult) {
                  handleAnswerSelect(option);
                } else {
                  speakText(option);
                }
              }}
              disabled={isLoading}
            >
              <Text style={textStyle}>{option}</Text>
              <Text style={styles.tapHint}>
                {showResult ? 'Tap to hear' : 'Tap to select'}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.footer}>
        <Text style={styles.voiceInfo}>
          Voice: {getCurrentVoice().language === 'en-GB' ? 'British' : 'American'} English
        </Text>
        <TouchableOpacity
          style={styles.restartButton}
          onPress={restartQuiz}
        >
          <Text style={styles.restartButtonText}>Restart Quiz</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  topicTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginBottom: 10,
  },
  progress: {
    fontSize: 16,
    color: '#888',
  },
  questionContainer: {
    marginBottom: 30,
  },
  questionButton: {
    backgroundColor: '#e3f2fd',
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#2196f3',
    alignItems: 'center',
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: '#1976d2',
    marginBottom: 10,
  },
  tapHint: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  loader: {
    marginTop: 10,
  },
  optionsContainer: {
    flex: 1,
  },
  optionButton: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ddd',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 5,
  },
  selectedOption: {
    backgroundColor: '#fff3e0',
    borderColor: '#ff9800',
  },
  selectedOptionText: {
    color: '#f57c00',
  },
  correctOption: {
    backgroundColor: '#e8f5e8',
    borderColor: '#4caf50',
  },
  correctOptionText: {
    color: '#2e7d32',
  },
  incorrectOption: {
    backgroundColor: '#ffebee',
    borderColor: '#f44336',
  },
  incorrectOptionText: {
    color: '#c62828',
  },
  footer: {
    alignItems: 'center',
    paddingTop: 20,
  },
  voiceInfo: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  restartButton: {
    backgroundColor: '#6c757d',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
  },
  restartButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ExercisesA2Quiz;