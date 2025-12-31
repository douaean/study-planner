import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Card from './Card';
import AnswerOption from './AnswerOption';

type QuestionCardProps = {
  title: string;
  options: string[];
  // controlled selection (optional)
  selectedIndex?: number;
  onSelect?: (index: number) => void;
  // when true show correct/incorrect feedback and disable presses
  showFeedback?: boolean;
  correctIndex?: number | null;
};

export default function QuestionCard({ title, options, selectedIndex = 0, onSelect, showFeedback = false, correctIndex = null }: QuestionCardProps) {
  // local fallback if parent doesn't control selection
  const [localSelected, setLocalSelected] = useState<number>(selectedIndex);

  React.useEffect(() => {
    setLocalSelected(selectedIndex);
  }, [selectedIndex]);

  function handleSelect(i: number) {
    setLocalSelected(i);
    if (onSelect) onSelect(i);
    console.log('Selected option index:', i);
  }

  return (
    <Card title={title} style={styles.card}>
      <View style={styles.options}>
        {options.map((opt, i) => {
          let status: 'default' | 'correct' | 'incorrect' = 'default';
          if (showFeedback && correctIndex !== null) {
            if (i === correctIndex) status = 'correct';
            else if (localSelected === i) status = 'incorrect';
          }

          return (
            <AnswerOption
              key={i}
              option={opt}
              onPress={() => handleSelect(i)}
              isSelected={localSelected === i}
              status={status}
              disabled={showFeedback}
            />
          );
        })}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
  },
  options: {
    marginTop: 6,
  },
});
