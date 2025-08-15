import React, { memo } from "react";
import { Image, Text, View } from "react-native";

export const CategoryItem = memo(
  ({ label, src }: { label: string; src: any }) => (
    <View className="items-center mr-6 w-24">
      <Image
        source={{ uri: src }}
        className="w-24 h-24 rounded-full"
        style={{ resizeMode: "cover" }}
      />
      <Text
        className="mt-2 text-center text-base font-semibold"
        numberOfLines={1}
      >
        {label}
      </Text>
    </View>
  )
);
