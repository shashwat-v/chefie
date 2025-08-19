import { getFavicon, getHostname, getYoutubeThumb } from "@/utils/linkPreview";
import * as Linking from "expo-linking";
import { Image, ImageBackground, Pressable, Text, View } from "react-native";

export const SourceCard = ({ url }: { url: string }) => {
  const domain = getHostname(url);
  const icon = getFavicon(url);
  return (
    <Pressable
      onPress={() => Linking.openURL(url)}
      className="flex-row items-center rounded-2xl border border-neutral-200 p-3 bg-white active:opacity-80"
    >
      <Image source={{ uri: icon }} className="w-8 h-8 rounded-lg mr-3" />
      <View className="flex-1">
        <Text className="text-sm text-neutral-500">Source</Text>
        <Text className="text-base font-semibold">{domain || "Open link"}</Text>
      </View>
      <Text className="text-neutral-400 ml-2">{">"}</Text>
    </Pressable>
  );
};

export const YoutubeCard = ({
  url,
  label = "Watch on YouTube",
}: {
  url: string;
  label?: string;
}) => {
  const thumb = getYoutubeThumb(url);
  return (
    <Pressable
      onPress={() => Linking.openURL(url)}
      className="rounded-2xl overflow-hidden border border-neutral-200 active:opacity-90"
    >
      <ImageBackground
        source={{ uri: thumb }}
        className="w-full h-40 justify-end"
      >
        <View className="absolute inset-0 bg-black/15" />
        {/* Play pill */}
        <View className="absolute inset-0 items-center justify-center">
          <View className="w-12 h-12 rounded-full bg-white/90 items-center justify-center">
            <Text className="text-lg font-bold">▶</Text>
          </View>
        </View>
        <View className="px-4 py-3 bg-black/35">
          <Text className="text-white font-semibold">{label}</Text>
        </View>
      </ImageBackground>
    </Pressable>
  );
};

export default YoutubeCard;
