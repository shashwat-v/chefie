import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Params = {
  name?: string;
  email?: string;
  avatarUrl?: string;
};

export default function WelcomeBack() {
  const {
    name = "Shashwat",
    email = "you@example.com",
    avatarUrl,
  } = useLocalSearchParams<Params>();
  const [password, setPassword] = useState("");
  const insets = useSafeAreaInsets();
  const router = useRouter();

  // Initial for fallback avatar
  const initial = (name?.trim()?.[0] ?? "U").toUpperCase();

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
              Welcome back
            </Text>
            <Text className="mt-2 text-base leading-6 text-gray-600">
              Sign in to continue.
            </Text>
          </View>

          {/* CARD */}
          <View className="px-6 mt-8">
            <View className="rounded-2xl bg-white border border-gray-100 shadow-sm px-4 py-6 items-center">
              {/* Avatar circle */}
              <View className="w-24 h-24 rounded-full overflow-hidden border border-gray-200 shadow-sm items-center justify-center bg-gray-50">
                {avatarUrl ? (
                  <Image
                    source={{ uri: avatarUrl }}
                    className="w-full h-full"
                  />
                ) : (
                  <Text className="text-3xl font-extrabold text-gray-700">
                    {initial}
                  </Text>
                )}
              </View>

              {/* Name + email */}
              <Text className="mt-4 text-xl font-bold text-gray-900">
                {name}
              </Text>
              <Text className="mt-1 text-gray-500">{email}</Text>

              {/* Password only */}
              <TextInput
                placeholder="Password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                className="w-full px-4 py-4 mt-6 rounded-xl border border-gray-200 bg-gray-50 text-gray-900"
              />

              {/* Sign in */}
              <TouchableOpacity
                activeOpacity={0.85}
                className="mt-6 w-full py-4 rounded-2xl items-center justify-center bg-red-500 shadow-md"
                onPress={() => {}}
              >
                <Text className="text-white text-lg font-semibold">Log in</Text>
              </TouchableOpacity>

              {/* Not you? */}
              <TouchableOpacity
                className="mt-4"
                onPress={() => router.replace("/(auth)/login")}
              >
                <Text className="text-red-600 font-semibold">
                  Not you? Use another account
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* FOOTER */}
          <View className="flex-row items-center justify-center px-6 mt-6">
            <Text className="text-gray-600 mr-1">Don’t have an account?</Text>
            <TouchableOpacity onPress={() => router.replace("/(auth)/signup")}>
              <Text className="text-red-600 font-semibold">Sign up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
