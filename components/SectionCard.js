import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ProgressBar from "./ProgressBar";

export default function SectionCard({ section, completedCount, totalCount, onPress }) {
  const progress = totalCount ? Math.round((completedCount / totalCount) * 100) : 0;
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={styles.top}>
        <View style={[styles.iconWrap, { backgroundColor: `${section.accent}22` }]}>
          <Ionicons name={section.icon} size={24} color={section.accent} />
        </View>
        <Ionicons name="chevron-forward" size={20} color="#8B95A7" />
      </View>
      <Text style={styles.title}>{section.title}</Text>
      <Text style={styles.meta}>{completedCount}/{totalCount} topics complete</Text>
      <ProgressBar value={progress} color={section.accent} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    minHeight: 168,
    borderRadius: 8,
    padding: 14,
    backgroundColor: "#101522",
    borderWidth: 1,
    borderColor: "#1F2937",
    gap: 10
  },
  pressed: {
    opacity: 0.78
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    color: "#F6F7FB",
    fontSize: 16,
    fontWeight: "800",
    lineHeight: 20,
    minHeight: 42
  },
  meta: {
    color: "#9CA3AF",
    fontSize: 12,
    fontWeight: "600"
  }
});
