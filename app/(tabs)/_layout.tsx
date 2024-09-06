import { Tabs } from "expo-router/tabs";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" options={{ tabBarLabel: "Home" }} />
      <Tabs.Screen name="shops" options={{ tabBarLabel: "Your shops" }} />
      <Tabs.Screen name="profile" options={{ tabBarLabel: "Profile" }} />
    </Tabs>
  );
}
