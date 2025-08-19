import { SourceCard, YoutubeCard } from "@/app/components/LinkCards";
import { getMealById } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";

const IMG_FALLBACK =
  "https://placehold.co/1200x800/eeeeee/999999.png?text=No+Image";

const MealDetailScreen = () => {
  const params = useLocalSearchParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const { meals, loading, error } = useFetch(() =>
    id ? getMealById(id) : Promise.resolve(null)
  );

  const meal = meals?.[0];

  const ingredients = useMemo(() => {
    if (!meal) return [];
    const rows: { name: string; measure: string }[] = [];
    for (let i = 1; i <= 20; i++) {
      const name = (meal[`strIngredient${i}`] || "").trim();
      const measure = (meal[`strMeasure${i}`] || "").trim();
      if (!name) continue;
      rows.push({ name, measure });
    }
    return rows;
  }, [meal]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center bg-white p-6">
        <Text className="text-red-500">{String(error?.message || error)}</Text>
      </View>
    );
  }

  if (!meal) {
    return (
      <View className="flex-1 items-center justify-center bg-white p-6">
        <Text>Meal not found.</Text>
      </View>
    );
  }

  const {
    strMeal,
    strMealThumb,
    strCategory,
    strArea,
    strInstructions,
    strSource,
    strYoutube,
  } = meal;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="flex-1 bg-white">
        <Image
          source={{ uri: strMealThumb || IMG_FALLBACK }}
          className="w-full h-80"
          resizeMode="cover"
        />
        <View className="p-4">
          <Text className="text-2xl font-bold">{strMeal}</Text>

          <Text className="text-neutral-500 mt-2">
            Category: {strCategory ?? "—"} | Area: {strArea ?? "—"}
          </Text>
        </View>

        <View className="px-4 mt-3">
          <Text className="text-xl font-semibold">Instructions</Text>
          <Text className="mt-2 leading-6 text-neutral-700">
            {strInstructions}
          </Text>
        </View>

        {/* Ingredients */}
        <View className="px-4 mt-6">
          <Text className="text-xl font-semibold">Ingredients</Text>
          <View className="mt-2 rounded-xl border border-neutral-200">
            {ingredients.map((row, idx) => (
              <View
                key={`${row.name}-${idx}`}
                className="flex-row items-center justify-between px-4 py-3 border-b border-neutral-200"
                style={
                  idx === ingredients.length - 1
                    ? { borderBottomWidth: 0 }
                    : undefined
                }
              >
                <Text className="text-neutral-500">{row.name}</Text>
                <Text className="text-neutral-800">{row.measure || "—"}</Text>
              </View>
            ))}
          </View>
        </View>
        <View className="pb-20">
          {(strSource || strYoutube) && (
            <View className="px-4 mt-6">
              <Text className="text-base font-semibold mb-2">Sources</Text>

              {strYoutube ? <YoutubeCard url={strYoutube} /> : null}

              {strSource ? (
                <View className={strYoutube ? "mt-3" : ""}>
                  <SourceCard url={strSource} />
                </View>
              ) : null}
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default MealDetailScreen;
