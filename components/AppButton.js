import React from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function AppButton({ title, icon, onPress, loading, variant = "primary", disabled }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.button,
        styles[variant],
        (pressed || disabled) && styles.dimmed
      ]}
    >
      {loading ? (
        <ActivityIndicator color={variant === "primary" ? "#061018" : "#F6F7FB"} />
      ) : (
        <>
          {icon ? <Ionicons name={icon} size={18} color={variant === "primary" ? "#061018" : "#F6F7FB"} /> : null}
          <Text style={[styles.text, variant === "primary" && styles.primaryText]}>{title}</Text>
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 52,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 18
  },
  primary: {
    backgroundColor: "#67E8F9"
  },
  ghost: {
    backgroundColor: "#151B2C",
    borderWidth: 1,
    borderColor: "#2B3548"
  },
  danger: {
    backgroundColor: "#451A1A",
    borderWidth: 1,
    borderColor: "#7F1D1D"
  },
  dimmed: {
    opacity: 0.72
  },
  text: {
    color: "#F6F7FB",
    fontWeight: "700",
    fontSize: 15
  },
  primaryText: {
    color: "#061018"
  }
});
