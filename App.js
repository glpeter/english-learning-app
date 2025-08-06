import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';

// Import the exercise data
import exercisesData from './src/screens/ExercisesScreen/exercisesA2.json';

const App = () => {
  const [currentExercise, setCurrentExercise] = useState(null);
  const [currentCategory, setCurrentCategory] = useState('present_simple');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    loadExercise();
  }, [currentCategory, currentIndex]);

  const loadExercise = () => {
    const exercises = exercisesData[currentCategory];
    if (exercises && exercises[currentIndex]) {
      setCurrentExercise(exercises[currentIndex]);
    }
  };

  const handleAnswer = (selectedAnswer) => {
    if (!currentExercise) return;

    const isCorrect = selectedAnswer === currentExercise.answer;
    
    if (isCorrect) {
      setScore(score + 1);
      Alert.alert('¡Correcto!', 'Respuesta correcta');
    } else {
      Alert.alert('Incorrecto', `La respuesta correcta es: ${currentExercise.answer}`);
    }

    // Move to next exercise
    const exercises = exercisesData[currentCategory];
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      Alert.alert('Ejercicios completados', `Puntuación: ${score + (isCorrect ? 1 : 0)}/${exercises.length}`);
    }
  };

  const resetExercises = () => {
    setCurrentIndex(0);
    setScore(0);
    loadExercise();
  };

  const changeCategory = (category) => {
    setCurrentCategory(category);
    setCurrentIndex(0);
    setScore(0);
  };

  if (!currentExercise) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Cargando ejercicios...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Aplicación de Aprendizaje de Inglés</Text>
          <Text style={styles.subtitle}>Emulador funcionando correctamente ✅</Text>
          <Text style={styles.score}>Puntuación: {score}</Text>
        </View>

        <View style={styles.categorySelector}>
          <Text style={styles.categoryTitle}>Categoría:</Text>
          <View style={styles.categoryButtons}>
            {Object.keys(exercisesData).map((category) => (
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
                  {category.replace('_', ' ')}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.exerciseContainer}>
          <Text style={styles.question}>{currentExercise.question}</Text>
          
          <View style={styles.optionsContainer}>
            {currentExercise.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.optionButton}
                onPress={() => handleAnswer(option)}>
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.resetButton} onPress={resetExercises}>
          <Text style={styles.resetButtonText}>Reiniciar Ejercicios</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  score: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  categorySelector: {
    marginBottom: 30,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  categoryButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  categoryButton: {
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  activeCategoryButton: {
    backgroundColor: '#007AFF',
  },
  categoryButtonText: {
    color: '#333',
    fontSize: 14,
    textTransform: 'capitalize',
  },
  activeCategoryButtonText: {
    color: 'white',
  },
  exerciseContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  optionsContainer: {
    gap: 10,
  },
  optionButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  optionText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resetButton: {
    backgroundColor: '#FF3B30',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  resetButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;