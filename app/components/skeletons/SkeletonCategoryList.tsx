import { Skeleton } from "moti/skeleton";
import React from "react";
import { FlatList } from "react-native";
import SkeletonCategoryItem from "./SkeletonCategoryItem";

export default function SkeletonCategoryList({
  count = 8,
}: {
  count?: number;
}) {
  return (
    <Skeleton.Group show>
      <FlatList
        horizontal
        data={Array.from({ length: count })}
        keyExtractor={(_, i) => `sk-${i}`}
        renderItem={() => <SkeletonCategoryItem />}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 16, paddingVertical: 8 }}
        snapToAlignment="start"
        decelerationRate="fast"
        initialNumToRender={count}
        windowSize={count}
      />
    </Skeleton.Group>
  );
}
