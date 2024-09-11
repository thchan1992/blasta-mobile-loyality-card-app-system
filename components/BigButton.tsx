import { fourthColor } from "@/app/util/color";
import { getScreenWidth } from "@/app/util/dimensions";
import { Href, Link } from "expo-router";
import { Platform, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export const BigButton = ({
  link,
  title,
}: {
  link: Href<string | object>;
  title: string;
}) => {
  return (
    <Link
      href={link}
      style={{
        height: "70%",
        width: "50%",
      }}
    >
      <TouchableOpacity
        style={[
          {
            backgroundColor: fourthColor,
            borderRadius: 40,
            width: getScreenWidth() * 0.9,
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            margin: 10,
          },
          Platform.OS === "android" && { padding: 10 },
        ]}
      >
        <Text style={{ fontWeight: "bold", textAlign: "center" }}>{title}</Text>
      </TouchableOpacity>
    </Link>
  );
};
