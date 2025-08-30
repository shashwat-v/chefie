// // services/auth.ts
// import * as Linking from "expo-linking";
// import { supabase } from "./supabase";

// /**
//  * Sign in with email + password.
//  */
// export async function signInWithEmail(email: string, password: string) {
//   const { data, error } = await supabase.auth.signInWithPassword({
//     email,
//     password,
//   });
//   if (error) throw new Error(error.message);
//   return data; // { user, session }
// }

// /**
//  * Sign up with email + password + full name.
//  * The DB trigger will insert into public.profiles immediately.
//  */
// export async function signUpWithEmail(
//   email: string,
//   password: string,
//   fullName: string
// ) {
//   const redirectTo = Linking.createURL("verify");

//   const { data, error } = await supabase.auth.signUp({
//     email,
//     password,
//     options: {
//       data: { full_name: fullName }, // saved into raw_user_meta_data
//       emailRedirectTo: redirectTo,
//     },
//   });
//   if (error) throw new Error(error.message);

//   const { session } = data;
//   const verificationEmailSent = !session; // true in prod, false in dev
//   return { ...data, verificationEmailSent };
// }

// /**
//  * Sign out the current user.
//  */
// export async function signOut() {
//   const { error } = await supabase.auth.signOut();
//   if (error) throw error;
// }

import * as Linking from "expo-linking";
import { supabase } from "./supabase"; // Ensure your Supabase client is initialized

/**
 * Sign in with email + password.
 * This function uses Supabase's built-in sign-in method and returns user data and session.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {Object} The user and session data returned from Supabase.
 */
export async function signInWithEmail(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new Error(error.message); // Handle any errors that occur during sign-in

    return data; // Return user data and session info if sign-in is successful
  } catch (err: any) {
    console.error("Sign-in error:", err.message);
    throw new Error(err.message || "An error occurred during sign-in.");
  }
}

/**
 * Sign up with email + password + full name.
 * This function uses Supabase's built-in sign-up method and stores the user's full name in the user metadata.
 * The DB trigger will automatically insert this data into the public.profiles table.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @param {string} fullName - The user's full name.
 * @returns {Object} The data returned from Supabase containing the user and session information.
 */
export async function signUpWithEmail(
  email: string,
  password: string,
  fullName: string
) {
  try {
    // Define the redirect URL for email verification
    const redirectTo = Linking.createURL("verify");

    // Call Supabase's signUp method
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName }, // Store the user's full name in raw_user_meta_data
        emailRedirectTo: redirectTo, // URL where the user is redirected after email verification
      },
    });

    if (error) throw new Error(error.message); // Handle any errors that occur during sign-up

    const { session } = data;
    const verificationEmailSent = !session; // True if email verification is needed

    return { ...data, verificationEmailSent }; // Return user data, session, and verification status
  } catch (err: any) {
    console.error("Sign-up error:", err.message);
    throw new Error(err.message || "An error occurred during sign-up.");
  }
}

/**
 * Sign out the current user.
 * This function logs out the current authenticated user from Supabase.
 */
export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) throw error; // Handle any errors that occur during sign-out
  } catch (err: any) {
    console.error("Sign-out error:", err.message);
    throw new Error(err.message || "An error occurred during sign-out.");
  }
}
