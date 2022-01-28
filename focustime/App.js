import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Focus } from './src/features/focus/focus';
import {Timer} from './src/features/timer/timer';
import {fontSizes, paddingSizes, spacing} from "./src/utils/sizes";

export default function App() {
  const [focusSubject, setFocusSubject] = useState("gardening");
  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer focusSubject = {focusSubject} onTimerEnd={() => {
            setFocusSubject(null);
          
        }}
        clearSubject = {() => setFocusSubject(null)}
        />
      ) : (
        <Focus addSubject={setFocusSubject} />
      )}
      <Text>{focusSubject}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#252250',
    paddingTop: spacing.md,
  },
});
