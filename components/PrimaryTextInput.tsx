import { getScreenHeight } from "@/app/util/dimensions";
import { Text, TextInput, View } from "react-native";

export const PrimaryTextInput = ({
  title,
  value,
  setter,
  placeholder,
  isPassword,
}: {
  title: string;
  value: string;
  setter: (value: string) => void;
  placeholder: string;
  isPassword: boolean;
}) => {
  return (
    <>
      <Text style={{ paddingLeft: 10, marginTop: 20, color: "white" }}>
        {title}
      </Text>
      <TextInput
        style={{
          borderWidth: 2,
          borderColor: "#6b6b6b",
          marginVertical: 4,
          width: "95%",
          height: getScreenHeight() * 0.08,
          margin: 10,
          padding: 10,
          borderRadius: 10,
          backgroundColor: "black",
          color: "white",
        }}
        placeholderTextColor="#6b6b6b"
        autoCapitalize="none"
        value={value}
        placeholder={placeholder}
        onChangeText={(value) => setter(value)}
        secureTextEntry={isPassword}
      />
    </>
  );
};
