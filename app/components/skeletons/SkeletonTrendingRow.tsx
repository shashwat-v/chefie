import React from "react";
import { View } from "react-native";

const SkeletonTrendingRow = () => {
  return (
    <View className="flex-row mt-3">
      {[...Array(4)].map((_, i) => (
        <View
          key={i}
          className="w-40 h-48 mr-4 rounded-2xl bg-gray-200"
          style={{ opacity: 0.6 }}
        />
      ))}
    </View>
  );
};

export default SkeletonTrendingRow;
