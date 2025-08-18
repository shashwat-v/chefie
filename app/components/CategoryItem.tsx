import { Link } from "expo-router";
import React, { memo } from "react";
import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Props {
  id: string;
  label: string;
  src: ImageSourcePropType | string;
  description?: string;
}

const CategoryItem = memo(({ id, label, src, description }: Props) => {
  const imageSource: ImageSourcePropType =
    typeof src === "string" ? { uri: src } : src;

  // const {}

  return (
    <Link href={{ pathname: "/meals/[name]", params: { name: label } }} asChild>
      <TouchableOpacity className="">
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
      </TouchableOpacity>
    </Link>
  );
});

export default CategoryItem;
