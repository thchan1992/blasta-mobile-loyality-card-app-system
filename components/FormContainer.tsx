import { secondaryColor } from "@/app/util/color";
import { getScreenHeight, getScreenWidth } from "@/app/util/dimensions";
import { ReactNode } from "react";
import { View } from "react-native";

export const FormContainer = ({ child }: { child: ReactNode }) => {
  return (
    <View
      style={{
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: secondaryColor,
        shadowColor: "black",
        shadowOpacity: 30,
        shadowRadius: 2,
      }}
    >
      {child}
    </View>
  );
};
