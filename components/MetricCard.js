import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function MetricCard({ icon, label, value, color = "#67E8F9" }) {
  return (
    <View style={styles.card}>
      <Ionicons name={icon} size={20} color={color} />
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minHeight: 94,
    borderRadius: 8,
    padding: 14,
    backgroundColor: "#101522",
    borderWidth: 1,
    borderColor: "#1F2937",
    justifyContent: "space-between"
  },
  value: {
    color: "#F6F7FB",
    fontSize: 20,
    fontWeight: "800"
  },
  label: {
    color: "#9CA3AF",
    fontSize: 12,
    fontWeight: "600"
  }
});
