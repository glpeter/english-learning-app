import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';

// Importar los ejercicios desde el archivo JSON existente
const exercisesA2 = require('./src/screens/ExercisesScreen/exercisesA2.json');

function App() {
  const [currentCategory, setCurrentCategory] = useState('present_simple');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const categories = {
    present_simple: 'Presente Simple',
    present_continuous: 'Presente Continuo',
    past_simple: 'Pasado Simple',
    past_continuous: 'Pasado Continuo',
  };

  const currentQuestions = exercisesA2[currentCategory];
  const currentQuestion = currentQuestions[currentQuestionIndex];

  const handleAnswer = (selectedAnswer) => {
    if (selectedAnswer === currentQuestion.answer) {
      setScore(score + 1);
      Alert.alert('¡Correcto!', 'Respuesta correcta', [
        {text: 'Continuar', onPress: nextQuestion},
      ]);
    } else {
      Alert.alert(
        'Incorrecto',
        `La respuesta correcta es: ${currentQuestion.answer}`,
        [{text: 'Continuar', onPress: nextQuestion}],
      );
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
  };

  const changeCategory = (category) => {
    setCurrentCategory(category);
    resetQuiz();
  };

  if (showResult) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>¡Quiz Completado!</Text>
          <Text style={styles.resultScore}>
            Puntuación: {score}/{currentQuestions.length}
          </Text>
          <Text style={styles.resultPercentage}>
            {Math.round((score / currentQuestions.length) * 100)}%
          </Text>
          <TouchableOpacity style={styles.button} onPress={resetQuiz}>
            <Text style={styles.buttonText}>Reintentar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={() => setShowResult(false)}>
            <Text style={styles.buttonText}>Cambiar Categoría</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>English Learning App</Text>
          <Text style={styles.subtitle}>Aplicación para aprender inglés</Text>
        </View>

        <View style={styles.categoryContainer}>
          <Text style={styles.categoryTitle}>Categoría Actual:</Text>
          <Text style={styles.currentCategory}>{categories[currentCategory]}</Text>
        </View>

        <View style={styles.categoryButtons}>
          {Object.keys(categories).map(category => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                currentCategory === category && styles.activeCategoryButton,
              ]}
              onPress={() => changeCategory(category)}>
              <Text
                style={[
                  styles.categoryButtonText,
                  currentCategory === category && styles.activeCategoryButtonText,
                ]}>
                {categories[category]}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.questionContainer}>
          <Text style={styles.questionCounter}>
            Pregunta {currentQuestionIndex + 1} de {currentQuestions.length}
          </Text>
          <Text style={styles.question}>{currentQuestion.question}</Text>
          
          <View style={styles.optionsContainer}>
            {currentQuestion.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.optionButton}
                onPress={() => handleAnswer(option)}>
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.scoreContainer}>
            <Text style={styles.scoreText}>Puntuación: {score}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: '#4a90e2',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
  },
  categoryContainer: {
    padding: 20,
    alignItems: 'center',
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  currentCategory: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4a90e2',
  },
  categoryButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  categoryButton: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    margin: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  activeCategoryButton: {
    backgroundColor: '#4a90e2',
    borderColor: '#4a90e2',
  },
  categoryButtonText: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
  activeCategoryButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  questionContainer: {
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  questionCounter: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
    textAlign: 'center',
  },
  question: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  optionsContainer: {
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  optionText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
  },
  scoreContainer: {
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  scoreText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4a90e2',
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  resultTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4a90e2',
    marginBottom: 20,
  },
  resultScore: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  resultPercentage: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#28a745',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#4a90e2',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    marginBottom: 15,
    minWidth: 200,
  },
  secondaryButton: {
    backgroundColor: '#6c757d',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default App;