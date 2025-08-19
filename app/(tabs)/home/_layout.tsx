import { Stack } from "expo-router";

export default function HomeStack() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="meals/[name]" />
      <Stack.Screen name="meals/meal/[id]" />
    </Stack>
  );
}
