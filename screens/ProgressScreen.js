import React, { useContext, useEffect, useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import MetricCard from "../components/MetricCard";
import ProgressBar from "../components/ProgressBar";
import { sections } from "../data/questions";
import { AuthContext } from "../navigation/AppNavigator";
import { subscribeToAttempts, subscribeToUserProgress } from "../services/progressService";

export default function ProgressScreen() {
  const { user } = useContext(AuthContext);
  const [progress, setProgress] = useState(null);
  const [attempts, setAttempts] = useState([]);
  const completedTopics = progress?.completedTopics || [];
  const totalTopics = sections.reduce((sum, section) => sum + section.topics.length, 0);
  const overall = Math.round((completedTopics.length / totalTopics) * 100);

  const averageAccuracy = useMemo(() => {
    if (!attempts.length) return 0;
    return Math.round(attempts.reduce((sum, attempt) => sum + (attempt.accuracy || 0), 0) / attempts.length);
  }, [attempts]);

  useEffect(() => {
    if (!user) return undefined;
    const unsubscribeProgress = subscribeToUserProgress(user.uid, setProgress);
    const unsubscribeAttempts = subscribeToAttempts(user.uid, setAttempts);
    return () => {
      unsubscribeProgress();
      unsubscribeAttempts();
    };
  }, [user]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Progress</Text>
      <View style={styles.metrics}>
        <MetricCard icon="flash-outline" label="XP" value={progress?.xp || 0} color="#A7F3D0" />
        <MetricCard icon="podium-outline" label="Level" value={progress?.level || 1} color="#FDE68A" />
        <MetricCard icon="analytics-outline" label="Avg accuracy" value={`${averageAccuracy}%`} color="#67E8F9" />
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Topic Completion</Text>
        <ProgressBar value={overall} />
        <Text style={styles.meta}>{completedTopics.length}/{totalTopics} topics completed</Text>
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Badges</Text>
        <View style={styles.badges}>
          {(progress?.badges?.length ? progress.badges : ["First Attempt Pending"]).map((badge) => (
            <View key={badge} style={styles.badge}>
              <Text style={styles.badgeText}>{badge}</Text>
            </View>
          ))}
        </View>
      </View>

      <Text style={styles.panelTitle}>Attempts History</Text>
      {attempts.length ? (
        attempts.map((attempt) => (
          <View key={attempt.id} style={styles.attempt}>
            <Text style={styles.attemptTitle}>{attempt.title}</Text>
            <Text style={styles.meta}>{attempt.score}/{attempt.total} • {attempt.accuracy}% accuracy</Text>
          </View>
        ))
      ) : (
        <Text style={styles.empty}>Your quiz attempts will appear here.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 18,
    paddingBottom: 32,
    gap: 16,
    backgroundColor: "#090B12"
  },
  title: {
    color: "#F6F7FB",
    fontSize: 28,
    fontWeight: "900"
  },
  metrics: {
    flexDirection: "row",
    gap: 10
  },
  panel: {
    borderRadius: 8,
    padding: 16,
    backgroundColor: "#101522",
    borderWidth: 1,
    borderColor: "#1F2937",
    gap: 12
  },
  panelTitle: {
    color: "#F6F7FB",
    fontSize: 18,
    fontWeight: "900"
  },
  meta: {
    color: "#9CA3AF"
  },
  badges: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8
  },
  badge: {
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: "#1F2937",
    borderWidth: 1,
    borderColor: "#374151"
  },
  badgeText: {
    color: "#FDE68A",
    fontWeight: "800"
  },
  attempt: {
    borderRadius: 8,
    padding: 14,
    backgroundColor: "#101522",
    borderWidth: 1,
    borderColor: "#1F2937"
  },
  attemptTitle: {
    color: "#F6F7FB",
    fontWeight: "800",
    marginBottom: 4
  },
  empty: {
    color: "#9CA3AF",
    backgroundColor: "#101522",
    borderRadius: 8,
    padding: 16
  }
});
