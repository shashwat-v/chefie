import { useEmailAuth } from "@/hooks/useEmailAuth";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
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

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [touched, setTouched] = useState({ email: false, password: false });

  const validateEmail = (s: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());
  const validatePassword = (s: string) => s.length > 0;

  const emailError =
    touched.email && !validateEmail(email)
      ? "Enter a valid email (e.g., user@example.com)."
      : "";

  const passwordError =
    touched.password && !validatePassword(password)
      ? "Please enter your password"
      : "";

  const allValid = useMemo(
    () => validateEmail(email) && validatePassword(password),
    [email, password]
  );

  const insets = useSafeAreaInsets();
  const router = useRouter();

  const onSignInPress = () => {
    setTouched({ email: true, password: true });
    if (!allValid) return;

    console.log("Login OK →", { email: email.trim(), password });
    onSignIn(email, password);
  };

  const emailBorder = emailError
    ? "border-red-500"
    : touched.email && !emailError
    ? "border-green-500"
    : "border-gray-200";

  const passwordBorder = passwordError
    ? "border-red-500"
    : touched.password && !passwordError
    ? "border-green-500"
    : "border-gray-200";

  const isReady = allValid;

  const { loading, onSignIn } = useEmailAuth({
    onSignedIn: () => router.replace("/(tabs)/home"),
  });

  return (
    <View className="flex-1 bg-white">
      <View className="absolute -top-20 -right-16 h-56 w-56 bg-red-100 rounded-full" />
      <View className="absolute top-28 -left-12 h-28 w-28 bg-red-50 rounded-full" />

      <KeyboardAvoidingView
        behavior={Platform.select({ ios: "padding", android: undefined })}
        style={{ flex: 1 }}
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            paddingTop: insets.top + 12,
            paddingBottom: insets.bottom + 16,
            flexGrow: 1,
            justifyContent: "space-between",
          }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="px-6">
            <Text className="text-3xl font-extrabold text-gray-900">
              Welcome Back!
            </Text>
            <Text className="mt-2 text-base leading-6 text-gray-600">
              Please enter your details.
            </Text>

            <View className="flex-row space-x-2 mt-4">
              <View className="h-2 w-2 rounded-full bg-red-500" />
              <View className="h-2 w-2 rounded-full bg-red-200" />
              <View className="h-2 w-6 rounded-full bg-red-200" />
            </View>
          </View>

          <View className="px-6 mt-8">
            <View className="rounded-2xl bg-white border border-gray-100 shadow-sm px-4 py-5">
              <TextInput
                placeholder="Email"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                className={[
                  "px-4 py-4 my-1 rounded-xl border bg-gray-50 text-gray-900",
                  emailBorder,
                ].join(" ")}
                returnKeyType="next"
                textContentType="emailAddress"
                autoComplete="email"
              />
              {!!emailError ? (
                <Text className="text-red-600 text-xs mt-1">{emailError}</Text>
              ) : (
                touched.email &&
                email.trim().length > 0 && (
                  <Text className="text-green-600 text-[11px] mt-1">
                    Looks good.
                  </Text>
                )
              )}

              <TextInput
                placeholder="Password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                className={[
                  "px-4 py-4 my-3 rounded-xl border bg-gray-50 text-gray-900",
                  passwordBorder,
                ].join(" ")}
                returnKeyType="done"
                textContentType="password"
              />
              {!!passwordError ? (
                <Text className="text-red-600 text-xs my-1">
                  {passwordError}
                </Text>
              ) : (
                <Text className="text-gray-400 text-[11px] my-1">
                  At least 8 characters.
                </Text>
              )}

              <TouchableOpacity className="self-end" onPress={() => {}}>
                <Text className="text-red-600 font-semibold">
                  Forgot password?
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.85}
                className={[
                  "mt-6 w-full py-4 rounded-2xl items-center justify-center shadow-md",
                  isReady ? "bg-red-500" : "bg-red-500/60",
                ].join(" ")}
                onPress={onSignInPress}
              >
                <Text className="text-white text-lg font-semibold">
                  {isReady ? "Sign In" : "Complete form to sign in"}
                </Text>
              </TouchableOpacity>

              <View className="flex-row items-center my-6">
                <View className="flex-1 h-px bg-gray-300" />
                <Text className="mx-3 text-gray-500">OR</Text>
                <View className="flex-1 h-px bg-gray-300" />
              </View>

              <TouchableOpacity
                activeOpacity={0.85}
                className="w-full py-4 rounded-2xl items-center justify-center bg-white border border-gray-200 shadow-sm flex-row"
                onPress={() => {}}
              >
                <Image
                  source={require("../../assets/images/google-logo.png")}
                  style={{ width: 18, height: 18, marginRight: 8 }}
                />
                <Text className="text-gray-800 font-semibold">
                  Sign in with Google
                </Text>
              </TouchableOpacity>
            </View>
          </View>

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
