import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function QuestionReviewCard({ question, answer, index }) {
  const selected = answer?.selectedIndex;
  const correct = question.answerIndex;
  return (
    <View style={styles.card}>
      <Text style={styles.prompt}>{index + 1}. {question.prompt}</Text>
      {question.options.map((option, optionIndex) => {
        const isCorrect = optionIndex === correct;
        const isSelected = optionIndex === selected;
        return (
          <View
            key={option}
            style={[
              styles.option,
              isCorrect && styles.correct,
              isSelected && !isCorrect && styles.wrong
            ]}
          >
            <Text style={styles.optionText}>{option}</Text>
          </View>
        );
      })}
      <Text style={styles.explanation}>{question.explanation}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    padding: 14,
    backgroundColor: "#101522",
    borderWidth: 1,
    borderColor: "#1F2937",
    gap: 10
  },
  prompt: {
    color: "#F6F7FB",
    fontWeight: "800",
    lineHeight: 21
  },
  option: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#151B2C",
    borderWidth: 1,
    borderColor: "#2B3548"
  },
  correct: {
    backgroundColor: "#064E3B",
    borderColor: "#10B981"
  },
  wrong: {
    backgroundColor: "#4C1D1D",
    borderColor: "#EF4444"
  },
  optionText: {
    color: "#F6F7FB",
    fontWeight: "600"
  },
  explanation: {
    color: "#CBD5E1",
    lineHeight: 20
  }
});
