import { useEmailAuth } from "@/hooks/useEmailAuth";
import { supabase } from "@/services/supabase";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
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
import VerifyEmailDialog from "../components/VerifyEmailDialog";

export default function Signup() {
  const [agree, setAgree] = useState(false);
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showVerifyPopup, setShowVerifyPopup] = useState(false);
  const [showVerify, setShowVerify] = useState(false);
  const [agreeTouched, setAgreeTouched] = useState(false);

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    confirm: false,
  });

  // Validators
  const validateName = (s: string) => s.trim().length > 0;
  const validateEmail = (s: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());
  const validatePassword = (s: string) => s.trim().length >= 6;
  const passwordsMatch = password === confirmPassword;

  const { loading, onSignUp } = useEmailAuth({
    onSignedIn: () => router.replace("/(tabs)/home"),
    onVerificationEmailSent: () => setShowVerifyPopup(true),
  });

  // Error messages
  const nameError =
    touched.name && !validateName(fullName) ? "Please enter your name." : "";

  const emailError =
    touched.email && !validateEmail(email)
      ? "Enter a valid email (e.g., user@example.com)."
      : "";

  const passwordError =
    touched.password && !validatePassword(password)
      ? "Password must be at least 6 characters."
      : "";

  const confirmError =
    touched.confirm && !passwordsMatch ? "Passwords do not match." : "";

  const allValid = useMemo(
    () =>
      validateName(fullName) &&
      validateEmail(email) &&
      validatePassword(password) &&
      passwordsMatch,
    [fullName, email, password, passwordsMatch]
  );

  const handleSubmit = () => {
    setTouched({ name: true, email: true, password: true, confirm: true });
    if (!allValid) return;
  };

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        if (showVerify) setShowVerify(false);
        router.replace("/(tabs)/home"); // or your home
      }
    });
    return () => sub.subscription.unsubscribe();
  }, [showVerify]);

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
              {/* Full Name */}
              <TextInput
                onChangeText={setFullName}
                onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                value={fullName}
                placeholder="Full name"
                placeholderTextColor="#9CA3AF"
                keyboardType="default"
                autoCapitalize="words"
                textContentType="name"
                className={[
                  "px-4 py-4 my-1 rounded-xl border bg-gray-50 text-gray-900",
                  nameError
                    ? "border-red-500"
                    : touched.name && !nameError
                    ? "border-green-500"
                    : "border-gray-200",
                ].join(" ")}
                returnKeyType="next"
              />
              {!!nameError ? (
                <Text className="text-red-600 text-xs mt-1">{nameError}</Text>
              ) : (
                touched.name &&
                fullName.trim().length > 0 && (
                  <Text className="text-green-600 text-[11px] mt-1">
                    Looks good.
                  </Text>
                )
              )}

              {/* Email */}
              <TextInput
                onChangeText={setEmail}
                onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                value={email}
                placeholder="Email"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
                textContentType="emailAddress"
                autoComplete="email"
                className={[
                  "px-4 py-4 my-3 rounded-xl border bg-gray-50 text-gray-900",
                  emailError
                    ? "border-red-500"
                    : touched.email && !emailError
                    ? "border-green-500"
                    : "border-gray-200",
                ].join(" ")}
                returnKeyType="next"
              />
              {!!emailError ? (
                <Text className="text-red-600 text-xs mb-1">{emailError}</Text>
              ) : (
                <Text className="text-gray-400 text-[11px] mb-1">
                  Use a personal email you check often.
                </Text>
              )}

              {/* Password */}
              <TextInput
                onChangeText={setPassword}
                onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                value={password}
                placeholder="Password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry
                textContentType="newPassword"
                className={[
                  "px-4 py-4 my-3 rounded-xl border bg-gray-50 text-gray-900",
                  passwordError
                    ? "border-red-500"
                    : touched.password && !passwordError
                    ? "border-green-500"
                    : "border-gray-200",
                ].join(" ")}
                returnKeyType="next"
              />
              {!!passwordError ? (
                <Text className="text-red-600 text-xs mb-1">
                  {passwordError}
                </Text>
              ) : (
                <Text className="text-gray-400 text-[11px] mb-2">
                  At least 8 characters.
                </Text>
              )}

              {/* Confirm Password */}
              <TextInput
                onChangeText={setConfirmPassword}
                onBlur={() => setTouched((t) => ({ ...t, confirm: true }))}
                value={confirmPassword}
                placeholder="Confirm password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry
                textContentType="newPassword"
                className={[
                  "px-4 py-4 my-1 rounded-xl border bg-gray-50 text-gray-900",
                  confirmError
                    ? "border-red-500"
                    : touched.confirm && !confirmError
                    ? "border-green-500"
                    : "border-gray-200",
                ].join(" ")}
                returnKeyType="done"
              />
              {!!confirmError && (
                <Text className="text-red-600 text-xs mt-1">
                  {confirmError}
                </Text>
              )}

              {/* terms */}
              <View className="flex-row items-center mt-3">
                <Pressable
                  accessibilityRole="checkbox"
                  accessibilityState={{ checked: agree }}
                  onPress={() => {
                    setAgreeTouched(true);
                    setAgree(!agree);
                  }}
                  hitSlop={8}
                  className={[
                    "h-5 w-5 mr-3 rounded-md border items-center justify-center",
                    agree ? "bg-red-500 border-red-500" : "border-gray-300",
                  ].join(" ")}
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

              {agreeTouched && !agree && (
                <Text className="text-red-600 text-xs mt-1">
                  You must agree to the Terms & Privacy Policy.
                </Text>
              )}

              {/* primary CTA */}
              <TouchableOpacity
                activeOpacity={0.85}
                disabled={!agree || !allValid}
                className={[
                  "mt-6 w-full py-4 rounded-2xl items-center justify-center shadow-md",
                  !agree || !allValid ? "bg-red-500/60" : "bg-red-500",
                ].join(" ")}
                onPress={() => {
                  setAgreeTouched(true); // mark as interacted
                  if (agree && allValid) {
                    handleSubmit();
                  }
                }}
              >
                <Text className="text-white text-lg font-semibold">
                  {!agree || !allValid ? "Complete form to sign up" : "Sign Up"}
                </Text>
              </TouchableOpacity>

              <VerifyEmailDialog
                visible={showVerifyPopup}
                onClose={() => setShowVerifyPopup(false)}
                email={email}
              />

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
                  source={require("../../assets/images/google-logo.png")}
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
