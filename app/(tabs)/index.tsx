import { countries } from "@/constants/images";
import { getMealCategories } from "@/services/api";
import useFetch from "@/services/useFetch";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CategoryItem from "../components/CategoryItem";

const Home = () => {
  // const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  // const { meals, loading, error } = useFetch(() =>
  //   // make it dyanmic using search bar
  //   getMealByName({ query: "" })
  // );
  const { meals, loading, error } = useFetch(() =>
    // make it dyanmic using search bar
    getMealCategories()
  );

  return (
    <>
      <ScrollView
        className="bg-white flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-4">
          {/* Header with name and settings icon */}
          <View className="flex-row items-center justify-between pb-6 mt-12">
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

          <Text className="text-2xl font-bold mt-6">Trending Recipes</Text>

          <Text className="text-2xl font-bold mt-6">Categories</Text>
          <View className="mt-3">
            {loading ? (
              <ActivityIndicator />
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
              renderItem={({ item }) => <CategoryItem {...item} />}
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

          {/* Trending Receipes */}
          {/* <Text className="text-2xl font-bold mt-6">Trending Receipes</Text>
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
                paddingRight: 16,
                paddingVertical: 8,
              }}
              // snapping behavior
              snapToAlignment="start"
              decelerationRate="fast"
              initialNumToRender={5}
              windowSize={5}
            />
          </View> */}

          {/* Continue Cooking(already looked dishes) */}
        </View>
      </ScrollView>
    </>
  );
};

export default Home;
