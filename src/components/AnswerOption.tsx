import React, { useRef } from 'react';
import { Pressable, Text, StyleSheet, Animated } from 'react-native';

type Props = {
  option: string;
  onPress: () => void;
  // selection/feedback
  isSelected?: boolean;
  status?: 'default' | 'correct' | 'incorrect';
  disabled?: boolean;
};

export default function AnswerOption({ option, onPress, isSelected = false, status = 'default', disabled = false }: Props) {
  const statusStyle = status === 'correct' ? styles.correct : status === 'incorrect' ? styles.incorrect : null;
  const textStyle = status === 'correct' ? styles.textCorrect : status === 'incorrect' ? styles.textIncorrect : (isSelected ? styles.textSelected : styles.text);

  // Use Animated for smooth press animations (compatible with Expo default)
  const scale = useRef(new Animated.Value(1)).current;
  const elev = useRef(new Animated.Value(4)).current;
  const shadowOpacity = useRef(new Animated.Value(0.08)).current;

  function handlePressIn() {
    if (disabled) return;
    Animated.parallel([
      Animated.timing(scale, { toValue: 0.985, duration: 120, useNativeDriver: false }),
      Animated.timing(elev, { toValue: 12, duration: 120, useNativeDriver: false }),
      Animated.timing(shadowOpacity, { toValue: 0.12, duration: 120, useNativeDriver: false }),
    ]).start();
  }
  function handlePressOut() {
    if (disabled) return;
    Animated.parallel([
      Animated.timing(scale, { toValue: 1, duration: 180, useNativeDriver: false }),
      Animated.timing(elev, { toValue: 4, duration: 180, useNativeDriver: false }),
      Animated.timing(shadowOpacity, { toValue: 0.08, duration: 180, useNativeDriver: false }),
    ]).start();
  }

  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={({ pressed }) => [
        // keep spacing behavior for accessibility
        { marginVertical: 10 },
      ]}
    >
      <Animated.View style={[
        styles.option,
        isSelected ? styles.selected : null,
        statusStyle,
        { transform: [{ scale }] },
        { shadowOpacity: shadowOpacity },
        { elevation: elev },
      ]}>
        <Text style={textStyle}>{option}</Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  option: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#ececec',
    // keep margin on parent
    backgroundColor: '#fff',
    minHeight: 56,
    justifyContent: 'center',
    // default shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  pressed: {
    opacity: 0.9,
  },
  selected: {
    backgroundColor: '#eafbe9',
    borderColor: '#86efac',
  },
  correct: {
    backgroundColor: '#d1fae5',
    borderColor: '#34d399',
  },
  incorrect: {
    backgroundColor: '#feeaea',
    borderColor: '#fca5a5',
  },
  text: {
    fontSize: 16,
    color: '#07221f',
  },
  textSelected: {
    color: '#064e3b',
    fontWeight: '700',
  },
  textCorrect: {
    color: '#065f46',
    fontWeight: '800',
  },
  textIncorrect: {
    color: '#7f1d1d',
    fontWeight: '700',
  },
});
