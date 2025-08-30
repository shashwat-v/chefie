import { Link } from "expo-router";
import React, { memo } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string | null;
};

const PLACEHOLDER =
  "https://placehold.co/600x400/eeeeee/999999.png?text=No+Image";

const MealCard = memo(({ idMeal, strMeal, strMealThumb }: Meal) => {
  const uri = strMealThumb ?? PLACEHOLDER;

  // console.log(idMeal);

  return (
    <Link
      href={{ pathname: "/home/meals/meal/[id]", params: { id: idMeal } }}
      asChild
    >
      <TouchableOpacity
        className="w-[48%] mb-4"
        accessibilityRole="button"
        accessibilityLabel={`Open ${strMeal}`}
        activeOpacity={0.8}
      >
        <View className="rounded-xl overflow-hidden">
          <Image
            source={{ uri }}
            className="w-full h-36 rounded-xl"
            resizeMode="cover"
          />
        </View>

        <Text className="mt-2 text-[15px] text-black" numberOfLines={2}>
          {strMeal}
        </Text>
      </TouchableOpacity>
    </Link>
  );
});

export default MealCard;
