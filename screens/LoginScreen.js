import React, { useEffect, useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import AppButton from "../components/AppButton";
import { GOOGLE_CLIENT_IDS, isFirebaseConfigured, loginWithEmail, loginWithGoogleCredential } from "../services/firebase";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [request, response, promptAsync] = Google.useAuthRequest(GOOGLE_CLIENT_IDS);

  useEffect(() => {
    if (response?.type === "success") {
      const idToken = response.authentication?.idToken || response.params?.id_token;
      if (idToken) {
        setLoading(true);
        loginWithGoogleCredential(idToken)
          .catch((error) => Alert.alert("Google Sign-In failed", error.message))
          .finally(() => setLoading(false));
      }
    }
  }, [response]);

  const submit = async () => {
    if (!email || !password) {
      Alert.alert("Missing details", "Enter your email and password.");
      return;
    }
    setLoading(true);
    loginWithEmail(email, password)
      .catch((error) => Alert.alert("Login failed", error.message))
      .finally(() => setLoading(false));
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.container}>
      <View style={styles.brandMark}>
        <Text style={styles.brandInitial}>A</Text>
      </View>
      <Text style={styles.title}>AptiMaster</Text>
      <Text style={styles.subtitle}>Train aptitude daily, level up steadily.</Text>

      {!isFirebaseConfigured ? (
        <Text style={styles.warning}>Add your Firebase config in services/firebase.js before signing in.</Text>
      ) : null}

      <View style={styles.form}>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor="#687386"
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.input}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          placeholderTextColor="#687386"
          secureTextEntry
          style={styles.input}
        />
        <AppButton title="Log In" icon="log-in-outline" onPress={submit} loading={loading} />
        <AppButton
          title="Continue with Google"
          icon="logo-google"
          variant="ghost"
          disabled={!request}
          onPress={() => promptAsync()}
        />
      </View>

      <Pressable onPress={() => navigation.navigate("Signup")} style={styles.linkWrap}>
        <Text style={styles.link}>New here? Create an account</Text>
      </Pressable>
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
  brandMark: {
    width: 66,
    height: 66,
    borderRadius: 8,
    backgroundColor: "#67E8F9",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18
  },
  brandInitial: {
    color: "#061018",
    fontSize: 32,
    fontWeight: "900"
  },
  title: {
    color: "#F6F7FB",
    fontSize: 38,
    fontWeight: "900"
  },
  subtitle: {
    color: "#9CA3AF",
    marginTop: 8,
    marginBottom: 28,
    fontSize: 16
  },
  warning: {
    color: "#FDE68A",
    backgroundColor: "#2D240D",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16
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
  },
  linkWrap: {
    marginTop: 22,
    alignItems: "center"
  },
  link: {
    color: "#67E8F9",
    fontWeight: "700"
  }
});
