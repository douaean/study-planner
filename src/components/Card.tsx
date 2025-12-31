import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';

type CardProps = {
  title?: string;
  children?: React.ReactNode;
  style?: ViewStyle;
};

export default function Card({ title, children, style }: CardProps) {
  return (
    <View style={[styles.card, style]}>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 26,
    // subtle border like screenshot
    borderWidth: 1,
    borderColor: '#f1f5f4',
    // iOS shadow (softer but more spread)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    // Android shadow
    elevation: 12,
    marginVertical: 14,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 14,
    color: '#043238',
  },
  content: {
    // content wrapper
  },
});
