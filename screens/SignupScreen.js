import React, { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, TextInput, View } from "react-native";
import AppButton from "../components/AppButton";
import { signupWithEmail } from "../services/firebase";

export default function SignupScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!name || !email || password.length < 6) {
      Alert.alert("Check details", "Enter your name, email, and a password with at least 6 characters.");
      return;
    }
    setLoading(true);
    signupWithEmail(name, email, password)
      .catch((error) => Alert.alert("Signup failed", error.message))
      .finally(() => setLoading(false));
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.container}>
      <View style={styles.form}>
        <TextInput value={name} onChangeText={setName} placeholder="Full name" placeholderTextColor="#687386" style={styles.input} />
        <TextInput value={email} onChangeText={setEmail} placeholder="Email" placeholderTextColor="#687386" autoCapitalize="none" keyboardType="email-address" style={styles.input} />
        <TextInput value={password} onChangeText={setPassword} placeholder="Password" placeholderTextColor="#687386" secureTextEntry style={styles.input} />
        <AppButton title="Create Account" icon="person-add-outline" onPress={submit} loading={loading} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#090B12",
    padding: 22,
    justifyContent: "center"
  },
  form: {
    gap: 12
  },
  input: {
    minHeight: 52,
    borderRadius: 8,
    paddingHorizontal: 14,
    color: "#F6F7FB",
    backgroundColor: "#101522",
    borderWidth: 1,
    borderColor: "#1F2937"
  }
});
