import { Stack } from "expo-router";

export default function HomeStack() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitle: "",
        headerShadowVisible: false,
        headerBackButtonDisplayMode: "minimal", // ✅ native-stack way
        // headerBackTitle: "", // <- alternative fallback if you prefer
        headerStyle: { backgroundColor: "#fff" },
      }}
    >
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="meals/[name]" />
      <Stack.Screen name="meals/meal/[id]" />
    </Stack>
  );
}
