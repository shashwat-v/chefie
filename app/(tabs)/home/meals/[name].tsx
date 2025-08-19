import MealCard from "@/app/components/MealCard";
import { getMealsByCategory, getMealsByCountry } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string | null;
};

export default function MealsByCategoryScreen() {
  const { name, type } = useLocalSearchParams<{ name: string; type: string }>();
  const param = String(name ?? "");

  const { meals, loading, error } = useFetch<Meal[]>(() =>
    type === "area" ? getMealsByCountry(param) : getMealsByCategory(param)
  );

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center bg-white p-4">
        <Text className="text-red-500">Failed to load: {error.message}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white px-4 pt-4">
      <Text className="text-2xl font-bold mb-3">{type}</Text>

      <FlatList
        data={meals ?? []}
        keyExtractor={(item) => item.idMeal}
        numColumns={2}
        // space between columns
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => <MealCard {...item} />}
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text className="text-gray-500 mt-8 text-center">
            No meals found.
          </Text>
        }
        initialNumToRender={8}
        windowSize={7}
      />
    </View>
  );
}
