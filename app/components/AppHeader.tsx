// components/AppHeader.tsx
import { MaterialIcons } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity /*, Image */, View } from "react-native";
// import { useAvatar } from "@/providers/AvatarProvider"; // uncomment when ready

type Props = {
  title: string;
  options: boolean;
  onBack?: () => void;
  onMenu?: () => void; // optional: toggle drawer, etc.
};

export default function AppHeader({ title, options, onBack, onMenu }: Props) {
  const avatar = require("../../assets/images/avatar.webp"); // uncomment when you wire the provider

  return (
    <View
      className="flex-row items-center justify-between px-4 bg-white/95 border-b border-neutral-200"
      style={{
        height: 56,
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2,
      }}
    >
      {options ? (
        <View className="w-[30px] h-[30px] rounded-full bg-neutral-300 border border-neutral-200 overflow-hidden">
          {avatar ? (
            <Image
              source={avatar}
              style={{ width: "100%", height: "100%" }}
              resizeMode="cover"
            />
          ) : null}
        </View>
      ) : (
        <>
          <TouchableOpacity
            onPress={onBack}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            style={{ width: 26, alignItems: "flex-start" }}
          >
            <MaterialIcons name="arrow-back" size={26} color="#111" />
          </TouchableOpacity>
        </>
      )}

      {/* Middle: title */}
      <Text className="text-xl font-semibold">{title}</Text>

      {/* Right: menu (keeps title centered by matching left width) */}
      {options ? (
        <TouchableOpacity
          onPress={onMenu}
          accessibilityRole="button"
          accessibilityLabel="Open menu"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          style={{ width: 26, alignItems: "flex-end" }}
        >
          <MaterialIcons name="menu" size={26} color="#111" />
        </TouchableOpacity>
      ) : (
        <View style={{ width: 26 }} />
      )}
    </View>
  );
}
