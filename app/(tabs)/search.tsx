import React, { useState } from "react";
import { Text, View } from "react-native";
import SearchBar from "../components/SearchBar";

const search = () => {
  const [query, setQuery] = useState("");

  return (
    <View className="px-4">
      <View className="flex-row items-center justify-between pb-6 mt-12">
        <Text className="text-2xl font-bold">Search</Text>
        {/* <MaterialIcons name="settings" size={28} /> */}
      </View>
      <SearchBar
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={() => console.log("search:", query)}
        className="w-full"
      />
    </View>
  );
};

export default search;
