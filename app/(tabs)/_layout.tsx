import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

const ICONS: Record<
  string,
  {
    active: keyof typeof Ionicons.glyphMap;
    inactive: keyof typeof Ionicons.glyphMap;
    label: string;
  }
> = {
  home: { active: "home", inactive: "home-outline", label: "Home" },
  plan: { active: "calendar", inactive: "calendar-outline", label: "Plan" },
  search: { active: "search", inactive: "search-outline", label: "Search" },
  saved: { active: "bookmark", inactive: "bookmark-outline", label: "Saved" },
  profile: { active: "person", inactive: "person-outline", label: "Profile" },
};

const _layout = () => {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#111",
        tabBarInactiveTintColor: "#999",
        tabBarLabelStyle: { fontSize: 12 },
        tabBarIcon: ({ focused, color }) => {
          const { active, inactive } = ICONS[route.name] ?? ICONS.home;
          return (
            <Ionicons
              name={focused ? active : inactive}
              size={22}
              color={color}
            />
          );
        },
      })}
    >
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="plan" options={{ title: "Plan" }} />
      <Tabs.Screen name="search" options={{ title: "Search" }} />
      <Tabs.Screen name="saved" options={{ title: "Saved" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
};

export default _layout;
