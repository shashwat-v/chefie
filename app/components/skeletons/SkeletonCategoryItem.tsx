import { Skeleton } from "moti/skeleton";
import React, { memo } from "react";
import { View } from "react-native";

const SkeletonCategoryItem = memo(() => {
  return (
    <View className="items-center mr-6 w-24">
      <Skeleton
        width={96}
        height={96}
        radius={48}
        colors={["#e5e7eb", "#f3f4f6", "#e5e7eb"]}
        transition={{ type: "timing", duration: 1500 }}
      />
      <View className="mt-2 items-center">
        <Skeleton
          width={80}
          height={14}
          radius={7}
          colors={["#e5e7eb", "#f3f4f6", "#e5e7eb"]}
          transition={{ type: "timing", duration: 1500 }}
        />
      </View>
    </View>
  );
});

export default SkeletonCategoryItem;
