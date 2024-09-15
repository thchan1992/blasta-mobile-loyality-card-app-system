import { Tabs } from "expo-router/tabs";
import { Image, View } from "react-native";
import { fourthColor, primaryColor, secondaryColor } from "../util/color";

export default function Layout() {
  const tabData = [
    {
      name: "index",
      tabBarLabel: "QR Code",
      source: require("@/assets/images/qr-code-01.png"),
    },
    {
      name: "shops",
      tabBarLabel: "Shops",
      source: require("@/assets/images/shopping-bag-01.png"),
    },
    {
      name: "profile",
      tabBarLabel: "Profile",
      source: require("@/assets/images/user-01.png"),
    },
  ];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarActiveBackgroundColor: primaryColor,
        headerShown: false,
      }}
    >
      {tabData.map((item, i) => {
        return (
          <Tabs.Screen
            key={i}
            name={item.name}
            options={{
              tabBarLabel: item.tabBarLabel,
              tabBarIcon: ({ size, focused, color }) => {
                return (
                  <View style={{ backgroundColor: "white", borderRadius: 3 }}>
                    <Image
                      style={{ width: size, height: size }}
                      source={item.source}
                    />
                  </View>
                );
              },
            }}
          />
        );
      })}
    </Tabs>
  );
}
