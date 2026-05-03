import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ProgressBar from "../components/ProgressBar";
import { getSectionById } from "../data/questions";
import { AuthContext } from "../navigation/AppNavigator";
import { subscribeToUserProgress } from "../services/progressService";

export default function SectionScreen({ navigation, route }) {
  const section = getSectionById(route.params.sectionId);
  const { user } = useContext(AuthContext);
  const [progress, setProgress] = useState(null);
  const completedTopics = progress?.completedTopics || [];

  useLayoutEffect(() => {
    navigation.setOptions({ title: section?.title || "Section" });
  }, [navigation, section]);

  useEffect(() => {
    if (!user) return undefined;
    return subscribeToUserProgress(user.uid, setProgress);
  }, [user]);

  if (!section) return null;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>{section.title}</Text>
      <Text style={styles.subheading}>Choose a topic, read the explanation, then start a timed quiz.</Text>
      {section.topics.map((topic) => {
        const complete = completedTopics.includes(topic.id);
        return (
          <Pressable
            key={topic.id}
            style={({ pressed }) => [styles.topicCard, pressed && styles.pressed]}
            onPress={() => navigation.navigate("Topic", { topicId: topic.id })}
          >
            <View style={styles.topicTop}>
              <View>
                <Text style={styles.topicTitle}>{topic.title}</Text>
                <Text style={styles.topicMeta}>{topic.questions.length} practice questions</Text>
              </View>
              <Ionicons name={complete ? "checkmark-circle" : "chevron-forward"} size={24} color={complete ? "#10B981" : "#8B95A7"} />
            </View>
            <ProgressBar value={complete ? 100 : 0} color={section.accent} />
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 18,
    gap: 14
  },
  heading: {
    color: "#F6F7FB",
    fontSize: 28,
    fontWeight: "900"
  },
  subheading: {
    color: "#9CA3AF",
    lineHeight: 20,
    marginBottom: 8
  },
  topicCard: {
    borderRadius: 8,
    padding: 16,
    backgroundColor: "#101522",
    borderWidth: 1,
    borderColor: "#1F2937",
    gap: 14
  },
  pressed: {
    opacity: 0.78
  },
  topicTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10
  },
  topicTitle: {
    color: "#F6F7FB",
    fontSize: 17,
    fontWeight: "800"
  },
  topicMeta: {
    color: "#9CA3AF",
    marginTop: 4
  }
});
