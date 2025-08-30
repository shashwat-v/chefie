import { isSaved, toggleSaved } from "@/services/saved.repo";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Pressable } from "react-native";

const SaveButton = ({
  meal,
  size = 22,
  onChange,
}: {
  meal: Meal;
  size?: number;
  onChange?: () => void;
}) => {
  const [saved, setSaved] = React.useState(false);

  // load initial saved state from DB
  React.useEffect(() => {
    let mounted = true;
    isSaved(meal.idMeal).then((v) => mounted && setSaved(v));
    return () => {
      mounted = false;
    };
  }, [meal.idMeal]);

  const onPress = async () => {
    await toggleSaved(meal); // save/unsave in SQLite
    const v = await isSaved(meal.idMeal); // reflect new state
    setSaved(v);
    onChange?.();
  };

  const iconName = saved ? "bookmark" : "bookmark-border";
  const iconColor = saved ? "#6B7280" /* gray-500 */ : "#111827"; /* gray-900 */

  return (
    <Pressable
      onPress={onPress}
      hitSlop={10}
      className="w-10 h-10 rounded-full border border-gray-300 bg-white items-center justify-center"
    >
      <MaterialIcons name={iconName as any} size={size} color={iconColor} />
    </Pressable>
  );
};

export default SaveButton;
