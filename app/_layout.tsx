// app/_layout.tsx
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import "./globals.css";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      {/* Hide or style the status bar as you like */}
      <StatusBar style="dark" hidden={true} />
      {/* Global safe area container */}
      <SafeAreaView
        style={{ flex: 1 }}
        edges={["top", "left", "right"]} // add "bottom" if you want bottom inset globally
      >
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="meals/[name]" />
          <Stack.Screen name="meals/meal/[id]" />
        </Stack>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
