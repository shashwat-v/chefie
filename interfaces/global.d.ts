import type { Auth } from "firebase/auth";

declare global {
  var auth: Auth; // declare a global type
}
