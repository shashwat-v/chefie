import { useRouter } from "expo-router";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const illo = require("../../assets/images/get_started.webp");
const { width } = Dimensions.get("window");
const router = useRouter();

export default function GetStarted() {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="flex-1 bg-white justify-between"
      style={{ paddingBottom: insets.bottom + 16 }}
    >
      <View>
        <View className="absolute -top-16 -right-16 h-56 w-56 bg-red-100 rounded-full" />
        <View className="absolute top-28 -left-12 h-28 w-28 bg-red-50 rounded-full" />

        <View className="items-center mt-14 px-6">
          <Image
            source={illo}
            className="w-full"
            resizeMode="contain"
            style={{ height: width * 0.75 }}
          />
        </View>

        <View className="px-6 mt-2">
          <Text className="text-3xl font-extrabold text-gray-900">
            Let’s Get Started
          </Text>
          <Text className="mt-2 text-base leading-6 text-gray-600">
            Discover tasty recipes, plan meals, and let AI surprise you with
            ideas.
          </Text>

          <View className="flex-row space-x-2 mt-4">
            <View className="h-2 w-6 rounded-full bg-red-500" />
            <View className="h-2 w-2 rounded-full bg-red-200" />
            <View className="h-2 w-2 rounded-full bg-red-200" />
          </View>
        </View>
      </View>

      <View className="px-6">
        <TouchableOpacity
          activeOpacity={0.85}
          className="w-full py-4 rounded-2xl items-center justify-center bg-red-500 shadow-md"
          onPress={() => router.push("/(auth)/signup")}
        >
          <Text className="text-white text-lg font-semibold">Get Started</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="mt-4 items-center"
          onPress={() => router.push("/(auth)/login")}
        >
          <Text className="text-gray-600">
            Already have an account?{" "}
            <Text className="text-red-600 font-semibold">Log in</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
