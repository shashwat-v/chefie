import { Href, Router } from "expo-router";

type NavLike = { canGoBack: () => boolean; goBack: () => void };

export const goBackOr = (
  navigation: NavLike,
  router: Router,
  fallback: Href = "/home"
) => {
  if (navigation.canGoBack()) navigation.goBack();
  else router.replace(fallback);
};
