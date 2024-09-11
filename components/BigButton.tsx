import { fourthColor } from "@/app/util/color";
import { getScreenWidth } from "@/app/util/dimensions";
import { Href, Link } from "expo-router";
import { Platform, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export const BigButton = ({
  link,
  title,
  customColor,
  onPress,
}: {
  link?: Href<string | object>;
  title: string;
  customColor?: string;
  onPress?: () => void;
}) => {
  const buttonContent = (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          backgroundColor: "#304FFE",
          borderRadius: 40,
          width: getScreenWidth() * 0.9,
          height: "80%",
          justifyContent: "center",
          alignItems: "center",
          margin: 10,
        },
        Platform.OS === "android" && { padding: 10 },
        customColor
          ? {
              backgroundColor: customColor,
              borderWidth: 1,
              borderColor: "#a2abfe",
            }
          : undefined,
      ]}
    >
      <Text
        style={[
          { fontWeight: "bold", textAlign: "center" },
          customColor ? { color: "#a2abfe" } : undefined,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );

  if (link) {
    return (
      <Link
        href={link}
        style={{
          height: "70%",
          width: "50%",
        }}
      >
        {buttonContent}
      </Link>
    );
  }

  return (
    <View
      style={{
        height: "70%",
        width: "50%",
      }}
    >
      {buttonContent}
    </View>
  );
};
