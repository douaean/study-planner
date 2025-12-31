import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View, Text } from 'react-native';
import QuizScreen from './src/screens/QuizScreen';
import { schoolInfo } from './src/data/questions';

export default function App() {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.title}>{schoolInfo.name}</Text>
        <Text style={styles.subtitle}>{schoolInfo.description}</Text>
      </View>

      <QuizScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f3f4f6' },
  header: {
    padding: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: { fontSize: 18, fontWeight: '700' },
  subtitle: { fontSize: 12, color: '#6b7280', marginTop: 4 },
});
