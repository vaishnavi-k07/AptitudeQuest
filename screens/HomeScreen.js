import React, { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import AppButton from "../components/AppButton";
import MetricCard from "../components/MetricCard";
import ProgressBar from "../components/ProgressBar";
import SectionCard from "../components/SectionCard";
import { AuthContext } from "../navigation/AppNavigator";
import { sections } from "../data/questions";
import { logout } from "../services/firebase";
import { subscribeToUserProgress, updateDailyStreak } from "../services/progressService";

export default function HomeScreen({ navigation }) {
  const { user } = useContext(AuthContext);
  const [progress, setProgress] = useState(null);
  const totalTopics = sections.reduce((sum, section) => sum + section.topics.length, 0);
  const completedTopics = progress?.completedTopics || [];
  const progressPercent = Math.round((completedTopics.length / totalTopics) * 100);

  useEffect(() => {
    if (!user) return undefined;
    updateDailyStreak(user.uid);
    return subscribeToUserProgress(user.uid, setProgress);
  }, [user]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.hello}>Welcome back,</Text>
          <Text style={styles.name}>{progress?.name || user?.displayName || "Learner"}</Text>
        </View>
        <AppButton title="Logout" icon="log-out-outline" variant="ghost" onPress={logout} />
      </View>

      <View style={styles.progressCard}>
        <Text style={styles.cardTitle}>Overall Progress</Text>
        <Text style={styles.bigNumber}>{progressPercent}%</Text>
        <ProgressBar value={progressPercent} />
      </View>

      <View style={styles.metrics}>
        <MetricCard icon="flame-outline" label="Daily streak" value={`${progress?.streak || 1}d`} color="#F97316" />
        <MetricCard icon="flash-outline" label="XP points" value={progress?.xp || 0} color="#A7F3D0" />
        <MetricCard icon="podium-outline" label="Level" value={progress?.level || 1} color="#FDE68A" />
      </View>

      <Text style={styles.sectionTitle}>Aptitude Sections</Text>
      <View style={styles.grid}>
        {sections.map((section) => {
          const completedCount = section.topics.filter((topic) => completedTopics.includes(topic.id)).length;
          return (
            <SectionCard
              key={section.id}
              section={section}
              completedCount={completedCount}
              totalCount={section.topics.length}
              onPress={() => navigation.navigate("Section", { sectionId: section.id })}
            />
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 18,
    paddingBottom: 32,
    gap: 18
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 14
  },
  hello: {
    color: "#9CA3AF",
    fontWeight: "600"
  },
  name: {
    color: "#F6F7FB",
    fontSize: 26,
    fontWeight: "900"
  },
  progressCard: {
    borderRadius: 8,
    padding: 18,
    backgroundColor: "#101522",
    borderWidth: 1,
    borderColor: "#1F2937",
    gap: 12
  },
  cardTitle: {
    color: "#CBD5E1",
    fontWeight: "700"
  },
  bigNumber: {
    color: "#F6F7FB",
    fontSize: 34,
    fontWeight: "900"
  },
  metrics: {
    flexDirection: "row",
    gap: 10
  },
  sectionTitle: {
    color: "#F6F7FB",
    fontSize: 20,
    fontWeight: "900"
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12
  }
});
