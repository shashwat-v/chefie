import React, { useState } from "react";
import { View } from "react-native";
import SearchBar from "../components/SearchBar";

const search = () => {
  const [query, setQuery] = useState("");

  return (
    <View className="px-4 bg-white">
      <View className="flex-1 items-center justify-between pb-6 mt-5"></View>
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
