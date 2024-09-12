import { getScreenHeight, getScreenWidth } from "@/app/util/dimensions";
import { useRouter } from "expo-router";
import React from "react";
import { Image, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export const BackButtonBar = () => {
  const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
        borderBottomWidth: 2,
        width: "100%",
        justifyContent: "center",
      }}
    >
      <TouchableOpacity
        onPress={() => {
          router.back();
        }}
      >
        <Image
          style={{
            width: getScreenWidth() * 0.1,
            height: getScreenHeight() * 0.1,
          }}
          source={require("@/assets/images/chevron-left.png")}
        />
      </TouchableOpacity>
    </View>
  );
};
