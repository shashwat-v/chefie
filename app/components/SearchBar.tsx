// components/SearchBar.tsx
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { forwardRef, useRef, useState } from "react";
import { Pressable, TextInput, TextInputProps } from "react-native";

type Props = {
  value: string;
  onChangeText: (t: string) => void;
  placeholder?: string;
  onSubmitEditing?: TextInputProps["onSubmitEditing"];
  className?: string; // allow extra tailwind classes
};

const SearchBar = forwardRef<TextInput, Props>(
  (
    { value, onChangeText, placeholder = "Search", onSubmitEditing, className },
    ref
  ) => {
    const inputRef = useRef<TextInput>(null);
    const [focused, setFocused] = useState(false);

    return (
      <Pressable
        onPress={() => (inputRef.current ?? (ref as any)?.current)?.focus()}
        accessibilityRole="search"
        className={`
          flex-row items-center rounded-3xl px-4 h-12
          bg-[#f5efef] border
          ${focused ? "border-[#775c5c]" : "border-gray-200"}
          ${className ?? ""}
        `}
      >
        <Ionicons name="search-outline" size={22} color="#775c5c" />
        <TextInput
          ref={(node) => {
            inputRef.current = node!;
            if (typeof ref === "function") ref(node!);
            // @ts-ignore
            else if (ref) ref.current = node!;
          }}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#775c5c"
          returnKeyType="search"
          onSubmitEditing={onSubmitEditing}
          // 👇 key bits to avoid clipping
          className="
            ml-3 flex-1
            text-[16px] leading-[20px]      /* line-height >= font-size */
            text-[#775c5c]
            h-full py-0                     /* no extra vertical padding inside input */
          border-"
        />
      </Pressable>
    );
  }
);

export default SearchBar;
