import React, { useRef } from 'react';
import { Pressable, Text, StyleSheet, View, PressableProps, Animated } from 'react-native';

type MyButtonProps = PressableProps & {
  text: string;
  icon?: React.ReactNode;
};

export default function MyButton({ text, icon, style, ...rest }: MyButtonProps) {
  const scale = useRef(new Animated.Value(1)).current;
  const elev = useRef(new Animated.Value(3)).current;

  function handlePressIn() {
    Animated.parallel([
      Animated.timing(scale, { toValue: 0.985, duration: 120, useNativeDriver: false }),
      Animated.timing(elev, { toValue: 10, duration: 120, useNativeDriver: false }),
    ]).start();
  }
  function handlePressOut() {
    Animated.parallel([
      Animated.timing(scale, { toValue: 1, duration: 180, useNativeDriver: false }),
      Animated.timing(elev, { toValue: 3, duration: 180, useNativeDriver: false }),
    ]).start();
  }

  return (
    <Pressable {...rest} onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <Animated.View style={[styles.btn, typeof style === 'function' ? style({ pressed: false }) : style, { transform: [{ scale }], elevation: elev }]}>
        <View style={styles.row}>
          <Text style={styles.text}>{text}</Text>
          {icon ? <View style={styles.icon}>{icon}</View> : null}
        </View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#064e3b',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  pressed: { opacity: 0.94 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
    letterSpacing: 1.5,
  },
  icon: {
    marginLeft: 12,
  },
});
