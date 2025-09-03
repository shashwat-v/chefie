// app/index.tsx
import { auth } from "@/services/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
import { onAuthStateChanged, type User } from "firebase/auth";
import { useEffect, useState } from "react";

const MAX_SESSION_DAYS = 7; // ⬅️ change to 1 if you want daily re-login

export default function Index() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        if (currentUser) {
          const now = Date.now();
          const stored = await AsyncStorage.getItem("lastLogin");

          if (!stored) {
            // First login on this device — store timestamp
            await AsyncStorage.setItem("lastLogin", String(now));
            setUser(currentUser);
          } else {
            const lastLogin = Number(stored);
            const ageDays = (now - lastLogin) / (1000 * 60 * 60 * 24);

            if (ageDays > MAX_SESSION_DAYS) {
              // Session too old → force re-login
              await AsyncStorage.removeItem("lastLogin");
              await auth.signOut();
              setUser(null);
            } else {
              setUser(currentUser);
            }
          }
        } else {
          // Signed out → clear timestamp
          await AsyncStorage.removeItem("lastLogin");
          setUser(null);
        }
      } finally {
        setInitializing(false);
      }
    });

    return unsubscribe;
  }, []);

  if (initializing) return null; // or your splash component
  return <Redirect href={user ? "/(tabs)/home" : "/(auth)/get-started"} />;
}
