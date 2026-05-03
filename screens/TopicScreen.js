import React, { useLayoutEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import AppButton from "../components/AppButton";
import { buildTopicQuiz, getTopicById } from "../data/questions";

export default function TopicScreen({ navigation, route }) {
  const topic = getTopicById(route.params.topicId);

  useLayoutEffect(() => {
    navigation.setOptions({ title: topic?.title || "Topic" });
  }, [navigation, topic]);

  if (!topic) return null;

  const quiz = buildTopicQuiz(topic);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.panel}>
        <Text style={styles.eyebrow}>{topic.section.title}</Text>
        <Text style={styles.title}>{topic.title}</Text>
        <Text style={styles.explanation}>{topic.explanation}</Text>
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Practice Quiz</Text>
        <Text style={styles.meta}>10 MCQs • 15 minutes • answer review after each question</Text>
        <AppButton title="Start Quiz" icon="play-outline" onPress={() => navigation.navigate("Quiz", { quiz })} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 18,
    gap: 16
  },
  panel: {
    borderRadius: 8,
    padding: 18,
    backgroundColor: "#101522",
    borderWidth: 1,
    borderColor: "#1F2937",
    gap: 12
  },
  eyebrow: {
    color: "#67E8F9",
    fontWeight: "800",
    textTransform: "uppercase",
    fontSize: 12
  },
  title: {
    color: "#F6F7FB",
    fontSize: 25,
    fontWeight: "900"
  },
  explanation: {
    color: "#CBD5E1",
    lineHeight: 22
  },
  panelTitle: {
    color: "#F6F7FB",
    fontSize: 19,
    fontWeight: "900"
  },
  meta: {
    color: "#9CA3AF"
  }
});
