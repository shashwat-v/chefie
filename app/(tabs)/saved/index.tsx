import AppHeader from "@/app/components/AppHeader";
import { getSavedMeals, unsaveMeal } from "@/services/saved.repo";
import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { Link, Stack } from "expo-router";
import React from "react";
import {
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function SavedScreen() {
  const [items, setItems] = React.useState<Meal[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);

  const load = React.useCallback(async () => {
    const data = await getSavedMeals();
    setItems(data);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      let cancelled = false;
      (async () => {
        try {
          const data = await getSavedMeals();
          if (!cancelled) setItems(data);
        } finally {
          if (!cancelled) setLoading(false);
        }
      })();
      return () => {
        cancelled = true;
      };
    }, [])
  );

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  }, [load]);

  if (loading) {
    return (
      <Center>
        <Text>Loading…</Text>
      </Center>
    );
  }

  if (items.length === 0) {
    return (
      <Center>
        <Text>No saved meals yet.</Text>
      </Center>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          header: () => <AppHeader title="Saved" options={true} />,
        }}
      />

      <View className="flex-1 px-4 mt-3">
        <FlatList
          data={items}
          keyExtractor={(m) => m.idMeal}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({ item }) => (
            <Link
              href={{
                pathname: "/saved/meal/[id]",
                params: { id: item.idMeal },
              }}
              asChild
            >
              {/* Row is pressable for navigation */}
              <TouchableOpacity
                activeOpacity={0.7}
                className="flex-row items-center bg-white p-3 rounded-xl mb-2.5"
              >
                {item.strMealThumb ? (
                  <Image
                    source={{ uri: item.strMealThumb }}
                    className="w-[72px] h-[72px] rounded-[10px] mr-3"
                  />
                ) : null}

                {/* Content */}
                <View className="flex-1">
                  <Text className="font-semibold text-lg">{item.strMeal}</Text>
                  {item.strCategory ? (
                    <Text>
                      {item.strCategory}
                      {item.strArea ? ` • ${item.strArea}` : ""}
                    </Text>
                  ) : item.strArea ? (
                    <Text>{item.strArea}</Text>
                  ) : null}
                </View>

                {/* Trash button (does NOT navigate) */}
                <Pressable
                  onPress={async (e) => {
                    e.stopPropagation(); // prevent row navigation
                    await unsaveMeal(item.idMeal);
                    setItems((prev) =>
                      prev.filter((x) => x.idMeal !== item.idMeal)
                    );
                  }}
                  hitSlop={10}
                  className="w-14 h-14 rounded-full border border-neutral-300 bg-white items-center justify-center"
                  accessibilityRole="button"
                  accessibilityLabel="Remove from saved"
                >
                  <MaterialIcons
                    name="delete-outline"
                    size={25}
                    color="#EF4444"
                  />
                </Pressable>
              </TouchableOpacity>
            </Link>
          )}
        />
      </View>
    </>
  );
}

function Center({ children }: { children: React.ReactNode }) {
  return <View className="flex-1 items-center justify-center">{children}</View>;
}
