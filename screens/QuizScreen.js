import React, { useEffect, useMemo, useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import AppButton from "../components/AppButton";
import ProgressBar from "../components/ProgressBar";

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
};

export default function QuizScreen({ navigation, route }) {
  const { quiz } = route.params;
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [locked, setLocked] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(quiz.durationMinutes * 60);

  const question = quiz.questions[index];
  const answer = answers[question.id];
  const progress = Math.round(((index + 1) / quiz.questions.length) * 100);

  const resultPayload = useMemo(() => {
    const answerList = quiz.questions.map((item) => answers[item.id] || { selectedIndex: null, isCorrect: false });
    const score = answerList.filter((item) => item.isCorrect).length;
    const accuracy = Math.round((score / quiz.questions.length) * 100);
    return { quiz, answers: answerList, score, accuracy };
  }, [answers, quiz]);

  useEffect(() => {
    if (secondsLeft <= 0) {
      navigation.replace("Result", resultPayload);
      return undefined;
    }
    const timer = setInterval(() => setSecondsLeft((value) => value - 1), 1000);
    return () => clearInterval(timer);
  }, [secondsLeft, navigation, resultPayload]);

  const confirmAnswer = () => {
    if (selectedIndex === null) {
      Alert.alert("Select an option", "Choose one answer before submitting.");
      return;
    }
    Alert.alert("Confirm answer", "Lock this answer?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Submit",
        onPress: () => {
          const isCorrect = selectedIndex === question.answerIndex;
          setAnswers((current) => ({
            ...current,
            [question.id]: { selectedIndex, isCorrect }
          }));
          setLocked(true);
        }
      }
    ]);
  };

  const goNext = () => {
    if (index === quiz.questions.length - 1) {
      navigation.replace("Result", resultPayload);
      return;
    }
    const nextIndex = index + 1;
    const nextQuestion = quiz.questions[nextIndex];
    setIndex(nextIndex);
    setSelectedIndex(answers[nextQuestion.id]?.selectedIndex ?? null);
    setLocked(Boolean(answers[nextQuestion.id]));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.timer}>{formatTime(secondsLeft)}</Text>
        <Text style={styles.count}>{index + 1}/{quiz.questions.length}</Text>
      </View>
      <ProgressBar value={progress} />

      <View style={styles.card}>
        <Text style={styles.quizTitle}>{quiz.title}</Text>
        <Text style={styles.prompt}>{question.prompt}</Text>
        <View style={styles.options}>
          {question.options.map((option, optionIndex) => {
            const isSelected = selectedIndex === optionIndex;
            const showCorrect = locked && optionIndex === question.answerIndex;
            const showWrong = locked && isSelected && optionIndex !== question.answerIndex;
            return (
              <Pressable
                key={option}
                disabled={locked}
                onPress={() => setSelectedIndex(optionIndex)}
                style={[
                  styles.option,
                  isSelected && styles.selected,
                  showCorrect && styles.correct,
                  showWrong && styles.wrong
                ]}
              >
                <Text style={styles.optionText}>{option}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {locked ? (
        <View style={styles.feedback}>
          <Text style={[styles.feedbackTitle, answer?.isCorrect ? styles.correctText : styles.wrongText]}>
            {answer?.isCorrect ? "Correct" : "Wrong"}
          </Text>
          <Text style={styles.explanation}>{question.explanation}</Text>
        </View>
      ) : null}

      <AppButton
        title={locked ? (index === quiz.questions.length - 1 ? "Finish Quiz" : "Next Question") : "Submit Answer"}
        icon={locked ? "arrow-forward-outline" : "checkmark-outline"}
        onPress={locked ? goNext : confirmAnswer}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 18,
    paddingBottom: 34,
    gap: 16
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  timer: {
    color: "#FDE68A",
    fontSize: 20,
    fontWeight: "900"
  },
  count: {
    color: "#9CA3AF",
    fontWeight: "800"
  },
  card: {
    borderRadius: 8,
    padding: 16,
    backgroundColor: "#101522",
    borderWidth: 1,
    borderColor: "#1F2937",
    gap: 16
  },
  quizTitle: {
    color: "#67E8F9",
    fontWeight: "800"
  },
  prompt: {
    color: "#F6F7FB",
    fontSize: 20,
    fontWeight: "900",
    lineHeight: 27
  },
  options: {
    gap: 10
  },
  option: {
    minHeight: 50,
    borderRadius: 8,
    padding: 14,
    justifyContent: "center",
    backgroundColor: "#151B2C",
    borderWidth: 1,
    borderColor: "#2B3548"
  },
  selected: {
    borderColor: "#67E8F9"
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
    fontWeight: "700"
  },
  feedback: {
    borderRadius: 8,
    padding: 14,
    backgroundColor: "#101522",
    borderWidth: 1,
    borderColor: "#1F2937",
    gap: 8
  },
  feedbackTitle: {
    fontSize: 18,
    fontWeight: "900"
  },
  correctText: {
    color: "#10B981"
  },
  wrongText: {
    color: "#EF4444"
  },
  explanation: {
    color: "#CBD5E1",
    lineHeight: 21
  }
});
