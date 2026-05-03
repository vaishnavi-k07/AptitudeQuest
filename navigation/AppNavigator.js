import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ensureUserProfile } from "../services/progressService";
import { subscribeToAuth } from "../services/firebase";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import HomeScreen from "../screens/HomeScreen";
import SectionScreen from "../screens/SectionScreen";
import TopicScreen from "../screens/TopicScreen";
import QuizScreen from "../screens/QuizScreen";
import ResultScreen from "../screens/ResultScreen";
import TestsScreen from "../screens/TestsScreen";
import ProgressScreen from "../screens/ProgressScreen";

export const AuthContext = React.createContext({ user: null });

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="HomeDashboard" component={HomeScreen} options={{ title: "AptiMaster" }} />
      <Stack.Screen name="Section" component={SectionScreen} />
      <Stack.Screen name="Topic" component={TopicScreen} />
      <Stack.Screen name="Quiz" component={QuizScreen} options={{ headerBackVisible: false }} />
      <Stack.Screen name="Result" component={ResultScreen} options={{ headerBackVisible: false }} />
    </Stack.Navigator>
  );
}

function TestsStack() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="TestsList" component={TestsScreen} options={{ title: "Sample Tests" }} />
      <Stack.Screen name="Quiz" component={QuizScreen} options={{ headerBackVisible: false }} />
      <Stack.Screen name="Result" component={ResultScreen} options={{ headerBackVisible: false }} />
    </Stack.Navigator>
  );
}

function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: "#67E8F9",
        tabBarInactiveTintColor: "#8B95A7",
        tabBarIcon: ({ color, size }) => {
          const icons = {
            Learn: "grid-outline",
            Tests: "timer-outline",
            Progress: "trophy-outline"
          };
          return <Ionicons name={icons[route.name]} size={size} color={color} />;
        }
      })}
    >
      <Tab.Screen name="Learn" component={HomeStack} />
      <Tab.Screen name="Tests" component={TestsStack} />
      <Tab.Screen name="Progress" component={ProgressScreen} />
    </Tab.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Signup" component={SignupScreen} options={{ title: "Create Account" }} />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToAuth(async (nextUser) => {
      setUser(nextUser);
      if (nextUser) await ensureUserProfile(nextUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color="#67E8F9" size="large" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={{ user }}>
      {user ? <AppTabs /> : <AuthStack />}
    </AuthContext.Provider>
  );
}

const screenOptions = {
  headerStyle: { backgroundColor: "#090B12" },
  headerTintColor: "#F6F7FB",
  headerTitleStyle: { fontWeight: "800" },
  contentStyle: { backgroundColor: "#090B12" }
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: "#090B12",
    alignItems: "center",
    justifyContent: "center"
  },
  tabBar: {
    backgroundColor: "#101522",
    borderTopColor: "#1F2937",
    height: 64,
    paddingBottom: 8,
    paddingTop: 8
  }
});
