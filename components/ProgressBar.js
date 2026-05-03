import React from "react";
import { StyleSheet, View } from "react-native";

export default function ProgressBar({ value, color = "#67E8F9" }) {
  const width = `${Math.max(0, Math.min(100, value))}%`;
  return (
    <View style={styles.track}>
      <View style={[styles.fill, { width, backgroundColor: color }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
    backgroundColor: "#20283A"
  },
  fill: {
    height: "100%",
    borderRadius: 4
  }
});
