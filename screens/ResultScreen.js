import React, { useContext, useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import AppButton from "../components/AppButton";
import QuestionReviewCard from "../components/QuestionReviewCard";
import { AuthContext } from "../navigation/AppNavigator";
import { saveQuizAttempt } from "../services/progressService";

export default function ResultScreen({ navigation, route }) {
  const { user } = useContext(AuthContext);
  const { quiz, answers, score, accuracy } = route.params;
  const [saved, setSaved] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);

  const goHome = () => {
    navigation.popToTop();
    navigation.getParent()?.navigate("Learn");
  };

  useEffect(() => {
    if (!user || saved) return;
    saveQuizAttempt({ uid: user.uid, quiz, answers, score, accuracy })
      .then((result) => setXpEarned(result.xpEarned))
      .catch((error) => Alert.alert("Progress not saved", error.message))
      .finally(() => setSaved(true));
  }, [user, saved, quiz, answers, score, accuracy]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.summary}>
        <Text style={styles.title}>Result</Text>
        <Text style={styles.score}>{score}/{quiz.questions.length}</Text>
        <Text style={styles.accuracy}>{accuracy}% accuracy • +{xpEarned} XP</Text>
      </View>

      <View style={styles.actions}>
        <AppButton title="Retry" icon="refresh-outline" onPress={() => navigation.replace("Quiz", { quiz })} />
        <AppButton title="Home" icon="home-outline" variant="ghost" onPress={goHome} />
      </View>

      <Text style={styles.reviewTitle}>Question Review</Text>
      {quiz.questions.map((question, index) => (
        <QuestionReviewCard key={question.id} question={question} answer={answers[index]} index={index} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 18,
    paddingBottom: 34,
    gap: 16
  },
  summary: {
    borderRadius: 8,
    padding: 22,
    backgroundColor: "#101522",
    borderWidth: 1,
    borderColor: "#1F2937",
    alignItems: "center",
    gap: 8
  },
  title: {
    color: "#9CA3AF",
    fontWeight: "800",
    textTransform: "uppercase"
  },
  score: {
    color: "#F6F7FB",
    fontSize: 42,
    fontWeight: "900"
  },
  accuracy: {
    color: "#A7F3D0",
    fontWeight: "800"
  },
  actions: {
    flexDirection: "row",
    gap: 10
  },
  reviewTitle: {
    color: "#F6F7FB",
    fontSize: 20,
    fontWeight: "900"
  }
});
