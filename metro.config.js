const { getDefaultConfig } = require("@expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const path = require("path");

const config = getDefaultConfig(__dirname);

// Ensure .cjs resolution (Firebase uses it)
config.resolver = config.resolver || {};
config.resolver.sourceExts = config.resolver.sourceExts || [];
if (!config.resolver.sourceExts.includes("cjs")) {
  config.resolver.sourceExts.push("cjs");
}

// 👇 Alias the subpath in case Metro/export maps act up
config.resolver.alias = {
  ...(config.resolver.alias || {}),
  "firebase/auth/react-native": path.resolve(
    __dirname,
    "node_modules/firebase/auth/dist/rn/index.js"
  ),
};

module.exports = withNativeWind(config, {
  input: "./app/globals.css",
});
