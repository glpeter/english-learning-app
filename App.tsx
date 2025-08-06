import React from 'react';
import { StyleSheet, View } from 'react-native';
import ExercisesA2Quiz from './src/screens/ExercisesScreen/ExercisesA2Quiz';

export default function App() {
  return (
    <View style={styles.container}>
      <ExercisesA2Quiz />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});