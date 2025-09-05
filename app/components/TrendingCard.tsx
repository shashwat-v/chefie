import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

type Props = {
  title: string;
  posterUrl?: string;
  count: number;
  onPress?: () => void;
};

const TrendingCard: React.FC<Props> = ({
  title,
  posterUrl,
  count,
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      className="w-40 h-48 mr-4 rounded-2xl overflow-hidden bg-gray-100"
      style={{
        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowRadius: 8,
        elevation: 3,
      }}
    >
      {posterUrl ? (
        <Image source={{ uri: posterUrl }} className="w-full h-full absolute" />
      ) : (
        <View className="w-full h-full bg-gray-200" />
      )}

      {/* flame + count */}
      <View className="absolute top-2 right-2 bg-white/85 px-2 py-1 rounded-full flex-row items-center">
        <Ionicons name="flame" size={14} color="#ef4444" />
        <Text className="ml-1 text-xs font-semibold">{count}</Text>
      </View>

      {/* bottom gradient + title */}
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.7)"]}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 80,
        }}
      />
      <Text
        numberOfLines={2}
        className="absolute bottom-2 left-2 right-2 text-white font-semibold"
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default TrendingCard;
