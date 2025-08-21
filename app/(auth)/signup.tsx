import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Signup() {
  const [agree, setAgree] = useState(false);
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View className="flex-1 bg-white">
      {/* soft decorative shapes */}
      <View className="absolute -top-20 -right-16 h-56 w-56 bg-red-100 rounded-full" />
      <View className="absolute top-28 -left-12 h-28 w-28 bg-red-50 rounded-full" />

      <KeyboardAvoidingView
        behavior={Platform.select({ ios: "padding", android: undefined })}
        style={{ flex: 1 }}
      >
        <ScrollView
          className="flex-1"
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            paddingTop: insets.top + 12,
            paddingBottom: insets.bottom + 16,
            flexGrow: 1,
            justifyContent: "space-between",
          }}
        >
          {/* HEADER */}
          <View className="px-6">
            <Text className="text-3xl font-extrabold text-gray-900">
              Let’s Get Started
            </Text>
            <Text className="mt-2 text-base leading-6 text-gray-600">
              Create your own account.
            </Text>

            {/* tiny progress dots for consistency */}
            <View className="flex-row space-x-2 mt-4">
              <View className="h-2 w-6 rounded-full bg-red-500" />
              <View className="h-2 w-2 rounded-full bg-red-200" />
              <View className="h-2 w-2 rounded-full bg-red-200" />
            </View>
          </View>

          {/* FORM CARD */}
          <View className="px-6 mt-8">
            <View className="rounded-2xl bg-white border border-gray-100 shadow-sm px-4 py-5">
              <TextInput
                placeholder="Name"
                placeholderTextColor="#9CA3AF"
                keyboardType="default"
                autoCapitalize="words"
                className="px-4 py-4 my-1 rounded-xl border border-gray-200 bg-gray-50 text-gray-900"
              />

              <TextInput
                placeholder="Email"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
                className="px-4 py-4 my-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900"
              />

              <TextInput
                placeholder="Password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry
                className="px-4 py-4 my-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900"
              />

              <TextInput
                placeholder="Confirm password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry
                className="px-4 py-4 my-1 rounded-xl border border-gray-200 bg-gray-50 text-gray-900"
              />

              {/* terms */}
              <View className="flex-row items-center mt-3">
                <Pressable
                  accessibilityRole="checkbox"
                  accessibilityState={{ checked: agree }}
                  onPress={() => setAgree(!agree)}
                  hitSlop={8}
                  className={`h-5 w-5 mr-3 rounded-md border items-center justify-center ${
                    agree ? "bg-red-500 border-red-500" : "border-gray-300"
                  }`}
                >
                  {agree ? (
                    <MaterialIcons name="check" size={14} color="#fff" />
                  ) : null}
                </Pressable>

                <Text className="text-gray-600">
                  I agree to the{" "}
                  <Text className="text-red-600 font-semibold">Terms</Text> and{" "}
                  <Text className="text-red-600 font-semibold">
                    Privacy Policy
                  </Text>
                </Text>
              </View>

              {/* primary CTA */}
              <TouchableOpacity
                activeOpacity={0.85}
                disabled={!agree}
                className={`mt-6 w-full py-4 rounded-2xl items-center justify-center shadow-md ${
                  agree ? "bg-red-500" : "bg-red-500/60"
                }`}
                onPress={() => {}}
              >
                <Text className="text-white text-lg font-semibold">
                  Sign Up
                </Text>
              </TouchableOpacity>

              {/* separator */}
              <View className="flex-row items-center my-6">
                <View className="flex-1 h-px bg-gray-300" />
                <Text className="mx-3 text-gray-500">OR</Text>
                <View className="flex-1 h-px bg-gray-300" />
              </View>

              {/* Google button (UI only) */}
              <TouchableOpacity
                activeOpacity={0.85}
                className="w-full py-4 rounded-2xl items-center justify-center bg-white border border-gray-200 shadow-sm flex-row"
                onPress={() => {}}
              >
                <Image
                  source={require("../../assets/images/google-logo.png")} // local PNG = fastest
                  style={{ width: 18, height: 18, marginRight: 8 }}
                />
                <Text className="text-gray-800 font-semibold">
                  Sign up with Google
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* FOOTER */}
          <View className="flex-row items-center justify-center px-6 mt-6">
            <Text className="text-gray-600 mr-1">Already have an account?</Text>
            <TouchableOpacity onPress={() => router.replace("/(auth)/login")}>
              <Text className="text-red-600 font-semibold">Sign in</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
