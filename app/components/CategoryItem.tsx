import React, { memo } from "react";
import { Image, ImageSourcePropType, Text, View } from "react-native";

interface Props {
  label: string;
  src: ImageSourcePropType | string;
}

const CategoryItem = memo(({ label, src }: Props) => {
  const imageSource: ImageSourcePropType =
    typeof src === "string" ? { uri: src } : src;

  return (
    <View className="items-center mr-6 w-24">
      <Image
        source={imageSource}
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
  );
});

export default CategoryItem;
