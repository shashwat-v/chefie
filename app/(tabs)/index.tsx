// import { categories } from "@/images";
import { MaterialIcons } from "@expo/vector-icons";
import React, { memo } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const categories: Category[] = [
  {
    id: "breakfast",
    label: "Breakfast",
    src: require("../../assets/images/food_1.png"),
  },
  {
    id: "vegan",
    label: "Vegan",
    src: require("../../assets/images/food_2.png"),
  },
  {
    id: "quick",
    label: "Quick",
    src: require("../../assets/images/food_3.png"),
  },
  {
    id: "lunch",
    label: "Lunch",
    src: require("../../assets/images/food_4.png"),
  },
  {
    id: "snacks",
    label: "Snacks",
    src: require("../../assets/images/food_5.png"),
  },
  {
    id: "dinner",
    label: "Dinner",
    src: require("../../assets/images/food_6.png"),
  },
  // add more as needed
];

const CategoryItem = memo(({ label, src }: { label: string; src: any }) => (
  <View className="items-center mr-6 w-24">
    <Image
      source={src}
      className="w-24 h-24 rounded-full"
      style={{ resizeMode: "cover" }}
    />
    <Text className="mt-2 text-center text-base font-semibold">{label}</Text>
  </View>
));

const Home = () => {
  return (
    <>
      <SafeAreaView className="bg-white flex-1">
        {/* Header with name and settings icon */}
        <View className="px-4">
          <View className="flex-row items-center justify-between pb-6">
            <Text className="text-2xl font-bold">Home</Text>
            <MaterialIcons name="settings" size={28} />
          </View>

          {/* Greetings */}
          <Text className="text-2xl font-bold">Hi, Shashwat!</Text>

          {/* Ai recommended today's special dish with a picture alongside */}
          <View className="flex-row mt-3">
            <View className="flex-1 pr-4">
              <Text className="text-gray-500">AI Recommended</Text>
              <Text className="mt-2 text-xl font-bold">
                Creamy Tomato Pasta
              </Text>
              <Text className="mt-1 text-gray-500">
                This simple pasta dish is perfect for a quick weeknight meal.
                The creamy tomato sauce is rich and flavorful, and it comes
                together in just 20 minutes.
              </Text>
            </View>
            <Image source={require("../../assets/images/dish.png")} />
          </View>

          {/* two small tabs saying search receipes and scan ingredients */}
          <View className="flex-row justify-between mt-8">
            <TouchableOpacity
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

          {/* Categories with clickable links in circle to other pages */}
          <Text className="text-2xl font-bold mt-6">Categories</Text>
          <View className="mt-6">
            <FlatList
              keyExtractor={(item) => item.id.toString()}
              horizontal={true}
              data={categories}
              renderItem={({ item }) => (
                <CategoryItem label={item.label} src={item.src} />
              )}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: 16,
                paddingVertical: 8,
              }}
              // snapping behavior
              snapToAlignment="start"
              decelerationRate="fast"
              initialNumToRender={5}
              windowSize={5}
            />
          </View>

          {/* Trending Receipes */}
          {/* Continue Cooking(already looked dishes) */}
        </View>
      </SafeAreaView>
    </>
  );
};

export default Home;
