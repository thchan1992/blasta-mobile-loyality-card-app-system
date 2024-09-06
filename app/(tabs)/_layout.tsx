import { Tabs } from "expo-router/tabs";
import { Image, View } from "react-native";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarActiveBackgroundColor: "black",
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "QR Code",
          tabBarIcon: ({ size, focused, color }) => {
            return (
              <View style={{ backgroundColor: "white", borderRadius: 3 }}>
                <Image
                  style={{ width: size, height: size }}
                  source={require("@/assets/images/qr-code-01.png")}
                />
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="shops"
        options={{
          tabBarLabel: "Shops",
          tabBarIcon: ({ size, focused, color }) => {
            return (
              <View style={{ backgroundColor: "white", borderRadius: 3 }}>
                <Image
                  style={{ width: size, height: size }}
                  source={require("@/assets/images/shopping-bag-01.png")}
                />
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ size, focused, color }) => {
            return (
              <View style={{ backgroundColor: "white", borderRadius: 3 }}>
                <Image
                  style={{ width: size, height: size }}
                  source={require("@/assets/images/user-01.png")}
                />
              </View>
            );
          },
        }}
      />
    </Tabs>
  );
}
