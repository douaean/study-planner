import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QuestionCard from '../components/QuestionCard';
import MyButton from '../components/MyButton';
import Card from '../components/Card';
import { QUESTIONS, quizQuestions } from '../data/questions';

export default function QuizScreen() {
  const [qIndex, setQIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const advanceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isEnd = qIndex >= quizQuestions.length;

  const current = quizQuestions[qIndex];
  const correctIndex = current ? current.options.indexOf(current.correctAnswer) : null;

  // start/reset timer when question changes
  useEffect(() => {
    setTimeLeft(20);
    setSelectedIndex(0); // default first option selected
    setShowFeedback(false);

    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (advanceRef.current) clearTimeout(advanceRef.current);
    };
  }, [qIndex]);

  // react to timeLeft reaching 0
  useEffect(() => {
    if (timeLeft <= 0 && !showFeedback && !isEnd) {
      // show correct answer, then advance
      setShowFeedback(true);
      if (timerRef.current) clearInterval(timerRef.current);
      advanceRef.current = setTimeout(() => {
        setQIndex((s) => s + 1);
      }, 1200);
    }
  }, [timeLeft, showFeedback, isEnd]);

  function advance() {
    // clear timers
    if (timerRef.current) clearInterval(timerRef.current);
    if (advanceRef.current) clearTimeout(advanceRef.current);
    // next
    setQIndex((s) => s + 1);
  }

  function handleNext() {
    if (!isEnd) {
      advance();
    }
  }

  function handleRestart() {
    // reset everything
    if (timerRef.current) clearInterval(timerRef.current);
    if (advanceRef.current) clearTimeout(advanceRef.current);
    setQIndex(0);
    setScore(0);
    setTimeLeft(20);
    setSelectedIndex(0);
    setShowFeedback(false);
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>{isEnd ? `Finished` : `Question ${qIndex + 1}/${QUESTIONS.length}`}</Text>
      </View>

      {/* Body */}
      <View style={styles.body}>
        {!isEnd ? (
          <>
            <Text style={styles.timer}>{timeLeft}sec</Text>
            <QuestionCard
              title={current.title}
              options={current.options}
              selectedIndex={selectedIndex}
              onSelect={(i) => {
                if (showFeedback) return; // ignore if feedback showing
                setSelectedIndex(i);
                setShowFeedback(true);
                // stop timer
                if (timerRef.current) clearInterval(timerRef.current);
                // check correctness
                if (i === correctIndex) {
                  setScore((s) => s + 1);
                }
                // auto advance after short delay
                advanceRef.current = setTimeout(() => {
                  setQIndex((s) => s + 1);
                }, 1200);
              }}
              showFeedback={showFeedback}
              correctIndex={correctIndex}
            />
          </>
        ) : (
          <Card title="End of Quiz">
            <Text style={{ marginBottom: 8 }}>You reached the end of the questions.</Text>
            <Text style={{ fontWeight: '700', marginBottom: 8 }}>Score: {score} / {quizQuestions.length}</Text>
            <MyButton text="Restart" onPress={handleRestart} style={styles.restartBtn} />
          </Card>
        )}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        {!isEnd ? (
          <MyButton text="Next" onPress={handleNext} style={styles.nextBtn} icon={<Text style={styles.nextIcon}>→</Text>} />
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f7fbf6',
  },
  header: {
    paddingVertical: 22,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0f766e',
  },
  body: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  timer: {
    marginBottom: 8,
    color: '#0f766e',
    textAlign: 'center',
    fontWeight: '800',
    marginTop: 6,
    fontSize: 13,
  },
  footer: {
    paddingVertical: 22,
    alignItems: 'center',
  },
  nextBtn: {
    width: '92%',
    borderRadius: 30,
    paddingVertical: 16,
  },
  restartBtn: {
    width: '100%',
  },
  nextIcon: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
  },
});
