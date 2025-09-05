import AppHeader from "@/app/components/AppHeader";
import SkeletonTrendingRow from "@/app/components/skeletons/SkeletonTrendingRow";
import TrendingCard from "@/app/components/TrendingCard";
import { countries } from "@/constants/images";
import { getMealCategories } from "@/services/api";
import { getTrendingMeals } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { Stack, useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CategoryItem from "../../components/CategoryItem";
import SkeletonCategoryList from "../../components/skeletons/SkeletonCategoryList";

const Home = () => {
  const router = useRouter();
  const { meals, loading, error } = useFetch(() => getMealCategories());
  const {
    meals: tredingMeals,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(() => getTrendingMeals());

  return (
    <>
      <Stack.Screen
        options={{
          header: () => <AppHeader title="Home" options={true} />,
        }}
      />
      <ScrollView
        className="bg-white flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-4">
          {/* Greetings */}
          <Text className="text-2xl font-bold mt-4">Hi, Shashwat!</Text>

          {/* Ai recommended today's special dish with a picture alongside */}
          <View className="flex-row mt-3">
            <View className="flex-1 pr-4">
              <Text className="text-gray-500">AI Recommended✨</Text>
              <Text className="mt-2 text-xl font-bold">
                Creamy Tomato Pasta
              </Text>
              <Text className="mt-1 text-gray-500">
                This simple pasta dish is perfect for a quick weeknight meal.
                The creamy tomato sauce is rich and flavorful, and it comes
                together in just 20 minutes.
              </Text>
            </View>
            <Image source={require("../../../assets/images/dish.png")} />
          </View>

          {/* two small tabs saying search receipes and scan ingredients */}
          <View className="flex-row justify-between mt-8">
            <TouchableOpacity
              onPress={() => router.push("/search")}
              activeOpacity={0.6}
              className="bg-gray-200 py-3 px-6 rounded-full"
            >
              <Text className="font-bold">Search Recipes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.6}
              className="bg-gray-200 py-3 px-6 rounded-full"
            >
              <Text className="font-bold">Scan Ingredients</Text>
            </TouchableOpacity>
          </View>

          {/* Surprise me with AI button */}
          <View className="mt-6">
            <TouchableOpacity
              activeOpacity={0.6}
              className="bg-red-500 items-center py-3 px-6 rounded-full"
            >
              <Text className="font-bold text-white">Surprise Me with AI</Text>
            </TouchableOpacity>
          </View>

          <View>
            <Text className="text-2xl font-bold mt-6">Trending Recipes</Text>
            {trendingLoading ? (
              <SkeletonTrendingRow />
            ) : trendingError ? (
              <Text>Some Error Occured</Text>
            ) : (
              <FlatList
                horizontal
                data={tredingMeals}
                // keyExtractor={(item) => item.meal_id.toString()}
                renderItem={({ item }) => (
                  <TrendingCard
                    title={item.title}
                    posterUrl={item.poster_url}
                    count={item.count}
                    onPress={() =>
                      router.push(`/(tabs)/home/meals/meal/${item.meal_id}`)
                    }
                  />
                )}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingRight: 16, paddingVertical: 8 }}
                snapToAlignment="start"
                decelerationRate="fast"
                initialNumToRender={5}
                windowSize={10}
              />
            )}
          </View>

          <Text className="text-2xl font-bold mt-6">Categories</Text>
          <View className="mt-3">
            {loading ? (
              <SkeletonCategoryList />
            ) : error ? (
              <Text>${error?.message}</Text>
            ) : (
              <FlatList
                keyExtractor={(item) => item.idCategory.toString()}
                horizontal={true}
                data={meals}
                renderItem={({ item }) => (
                  <CategoryItem
                    id={item.idCategory}
                    label={item.strCategory}
                    src={item.strCategoryThumb}
                    description={item.strCategoryDescription}
                    type="category"
                  />
                )}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  paddingRight: 16,
                  paddingVertical: 8,
                }}
                // snapping behavior
                snapToAlignment="start"
                decelerationRate="fast"
                initialNumToRender={5}
                windowSize={5}
              />
            )}
          </View>

          {/* Categories with clickable links in circle to other pages */}
          <Text className="text-2xl font-bold mt-6">By Country</Text>

          <View className="mt-3">
            <FlatList
              keyExtractor={(item) => item.id.toString()}
              horizontal={true}
              data={countries}
              renderItem={({ item }) => <CategoryItem {...item} type="area" />}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingRight: 16,
                paddingVertical: 8,
              }}
              // snapping behavior
              snapToAlignment="start"
              decelerationRate="fast"
              initialNumToRender={5}
              windowSize={5}
            />
          </View>

          {/* Continue Cooking(already looked dishes) */}
        </View>
      </ScrollView>
    </>
  );
};

export default Home;
