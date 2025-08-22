// services/auth.ts
import * as Linking from "expo-linking";
import { supabase } from "./supabase";

/**
 * Sign in with email + password.
 */
export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data; // { user, session }
}

/**
 * Sign up with email + password + full name.
 * The DB trigger will insert into public.profiles immediately.
 */
export async function signUpWithEmail(
  email: string,
  password: string,
  fullName: string
) {
  const redirectTo = Linking.createURL("verify");

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName }, // saved into raw_user_meta_data
      emailRedirectTo: redirectTo,
    },
  });
  if (error) throw error;

  const { session } = data;
  const verificationEmailSent = !session; // true in prod, false in dev
  return { ...data, verificationEmailSent };
}

/**
 * Sign out the current user.
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}
