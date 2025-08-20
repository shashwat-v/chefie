import AppHeader from "@/app/components/AppHeader";
import MealCard from "@/app/components/MealCard";
import { getMealsByCategory, getMealsByCountry } from "@/services/api";
import useFetch from "@/services/useFetch";
import { goBackOr } from "@/utils/nav";
import {
  Href,
  useLocalSearchParams,
  useNavigation,
  useRouter,
} from "expo-router";
import React, { useCallback, useLayoutEffect } from "react";
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

  const navigation = useNavigation();
  const router = useRouter();

  const handleBack = useCallback(() => {
    // 1) normal back if there is history
    if (navigation?.canGoBack && navigation.canGoBack()) {
      navigation.goBack();
      return;
    }
    // 2) fallback route (tab root)
    router.replace("/home" as Href);
  }, [navigation, router]);

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <AppHeader
          title={name}
          options={false}
          onBack={() => goBackOr(navigation, router)}
        />
      ),
      headerTitle: "",
      headerBackButtonDisplayMode: "minimal",
    });
  }, [navigation, name]);

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
    <>
      <View className="flex-1 bg-white px-4 pt-4">
        <FlatList
          data={meals ?? []}
          keyExtractor={(item) => item.idMeal}
          numColumns={2}
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
    </>
  );
}
