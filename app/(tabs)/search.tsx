import { getMealByName } from "@/services/api";
import { updateSearchCount } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  Text,
  View,
} from "react-native";
import MealCard from "../components/MealCard";
import SearchBar from "../components/SearchBar";

const Search = () => {
  const [query, setQuery] = useState("");

  const {
    meals,
    loading,
    error,
    refetch: loadMeals,
    reset,
  } = useFetch(() => getMealByName({ query }));

  useEffect(() => {
    const id = setTimeout(async () => {
      const q = query.trim();
      if (q) {
        await loadMeals();
      } else {
        reset();
      }
    }, 500);
    return () => clearTimeout(id);
  }, [query]);

  useEffect(() => {
    const q = query.trim();
    if (q && meals?.length && meals[0]) {
      updateSearchCount(q, meals[0]).catch(() => {});
    }
  }, [meals, query]);

  const hasQuery = query.trim().length > 0;
  const resultCount = meals?.length ?? 0;

  const ListHeader = useMemo(
    () => (
      <View className="bg-white px-4 pb-3 pt-4 border-b border-gray-100">
        <Text className="text-xl font-bold mb-3">Search</Text>
        <SearchBar
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={() => {
            if (hasQuery) loadMeals();
            Keyboard.dismiss();
          }}
          className="w-full"
        />
        {hasQuery && !loading && (
          <Text className="text-gray-500 mt-2">
            {resultCount} result{resultCount === 1 ? "" : "s"}
          </Text>
        )}
      </View>
    ),
    [query, hasQuery, loading, resultCount]
  );

  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={meals ?? []}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => <MealCard {...item} />}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-between",
        }}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={ListHeader}
        stickyHeaderIndices={[0]}
        ListEmptyComponent={() => {
          if (loading) {
            return (
              <View className="items-center justify-center mt-10">
                <ActivityIndicator />
                <Text className="text-gray-500 mt-3">Finding tasty ideas…</Text>
              </View>
            );
          }
          if (!hasQuery) {
            return (
              <View className="items-center justify-center mt-16 px-6">
                <Text className="text-5xl mb-2">🍽️</Text>
                <Text className="text-lg font-semibold">
                  Search a meal to begin
                </Text>
                <Text className="text-gray-500 text-center mt-1">
                  Try “pasta”, “chicken”, or “soup”.
                </Text>
              </View>
            );
          }
          if (error) {
            return (
              <View className="items-center justify-center mt-16 px-6">
                <Text className="text-lg font-semibold">
                  Something went wrong
                </Text>
                <Text className="text-gray-500 text-center mt-1">
                  Please try again in a moment.
                </Text>
              </View>
            );
          }
          return (
            <View className="items-center justify-center mt-16 px-6">
              <Text className="text-5xl mb-2">😕</Text>
              <Text className="text-lg font-semibold">
                No meals found for “{query}”
              </Text>
              <Text className="text-gray-500 text-center mt-1">
                Check spelling or try a broader term.
              </Text>
            </View>
          );
        }}
        initialNumToRender={8}
      />
    </View>
  );
};

export default Search;
