import { getDefaultConfig } from "expo/metro-config";
require("ts-node/register");

// Nhận cấu hình mặc định
const defaultConfig = getDefaultConfig(__dirname);

module.exports = {
  resolver: {
    sourceExts: [
      ...(defaultConfig.resolver?.sourceExts || []), // Kiểm tra nếu sourceExts tồn tại, nếu không thì dùng mảng rỗng
      "ios.ts",
      "android.ts",
      "native.ts",
      "web.ts",
      "ts",
      "tsx",
      "ios.tsx",
      "android.tsx",
      "native.tsx",
      "web.tsx",
      "jsx",
      "js",
      "json",
    ],
    alias: {
      "@app": "./src",
    },
  },
  watchFolders: ["./src"], // Theo dõi thư mục src cho sự thay đổi tệp
  ...defaultConfig,
};
