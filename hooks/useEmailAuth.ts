// hooks/useEmailAuth.ts
import { useState } from "react";
import { Alert } from "react-native";
import { signInWithEmail, signUpWithEmail } from "../services/auth";

type Options = {
  onSignedIn?: () => void; // called when login or dev sign-up succeeds
  onVerificationEmailSent?: () => void; // called when sign-up requires email confirmation
};

/**
 * Small React hook that wraps sign-in / sign-up with loading state.
 * It calls the callbacks you pass in Options when auth events succeed.
 */
export function useEmailAuth(opts: Options = {}) {
  const [loading, setLoading] = useState(false);

  const onSignUp = async (
    email: string,
    password: string,
    fullName: string
  ) => {
    try {
      setLoading(true);
      const { session, verificationEmailSent } = await signUpWithEmail(
        email.trim(),
        password,
        fullName.trim()
      );

      if (verificationEmailSent) {
        opts.onVerificationEmailSent?.();
        opts.onSignedIn?.();
      } else if (session) {
        console.log(session);
        opts.onSignedIn?.();
      }
    } catch (err: any) {
      Alert.alert(err.message ?? "Sign-up failed");
    } finally {
      setLoading(false);
    }
  };

  const onSignIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { session } = await signInWithEmail(email.trim(), password);
      if (session) {
        opts.onSignedIn?.();
      }
    } catch (err: any) {
      Alert.alert(err.message ?? "Sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  return { loading, onSignIn, onSignUp };
}
