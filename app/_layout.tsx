import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import "./globals.css";

export default function RootLayout() {
  return (
    <>
      <StatusBar hidden={true} />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="meals/[name]" options={{ headerShown: false }} />
        <Stack.Screen name="meals/meal/[id]" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
