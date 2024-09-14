import { getScreenHeight, getScreenWidth } from "@/app/util/dimensions";
import { sharedStyles } from "@/app/util/styles";
import { useRouter } from "expo-router";
import React from "react";
import { Image, View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export const BackButtonBar = () => {
  const router = useRouter();
  return (
    <View style={sharedStyles.headerContainer}>
      <TouchableOpacity
        onPress={() => {
          router.back();
        }}
      >
        <Image
          style={styles.backButtonContainer}
          source={require("@/assets/images/chevron-left.png")}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  backButtonContainer: {
    width: getScreenWidth() * 0.1,
    height: getScreenHeight() * 0.1,
  },
});
