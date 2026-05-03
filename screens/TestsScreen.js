import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { sampleTests } from "../data/questions";

export default function TestsScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Sample Tests</Text>
      <Text style={styles.subtitle}>Mixed and section-wise 20-question tests with a 20-minute timer.</Text>
      {sampleTests.map((test) => (
        <Pressable
          key={test.id}
          style={({ pressed }) => [styles.card, pressed && styles.pressed]}
          onPress={() => navigation.navigate("Quiz", { quiz: test })}
        >
          <View style={styles.left}>
            <View style={styles.icon}>
              <Ionicons name="timer-outline" size={23} color="#67E8F9" />
            </View>
            <View style={styles.textWrap}>
              <Text style={styles.testTitle}>{test.title}</Text>
              <Text style={styles.meta}>{test.questions.length} questions • {test.durationMinutes} minutes</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#8B95A7" />
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 18,
    paddingBottom: 32,
    gap: 14,
    backgroundColor: "#090B12"
  },
  title: {
    color: "#F6F7FB",
    fontSize: 28,
    fontWeight: "900"
  },
  subtitle: {
    color: "#9CA3AF",
    lineHeight: 20,
    marginBottom: 8
  },
  card: {
    borderRadius: 8,
    padding: 14,
    backgroundColor: "#101522",
    borderWidth: 1,
    borderColor: "#1F2937",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12
  },
  pressed: {
    opacity: 0.78
  },
  left: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },
  icon: {
    width: 44,
    height: 44,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#67E8F922"
  },
  textWrap: {
    flex: 1
  },
  testTitle: {
    color: "#F6F7FB",
    fontSize: 16,
    fontWeight: "800"
  },
  meta: {
    color: "#9CA3AF",
    marginTop: 4
  }
});
