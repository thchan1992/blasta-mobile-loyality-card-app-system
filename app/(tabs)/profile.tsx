import { SignedIn, useUser, useClerk } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import * as SecureStore from "expo-secure-store";

import { TouchableOpacity } from "react-native-gesture-handler";
import { fifthColor, primaryColor } from "../util/color";

export default function Page() {
  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <View style={styles.profileContainer}>
      <SignedIn>
        <Text style={styles.email}>{user?.emailAddresses[0].emailAddress}</Text>
        <TouchableOpacity
          style={styles.signoutButton}
          onPress={async () => {
            await signOut();
            const res = await SecureStore.deleteItemAsync("userId");
            router.replace("/(auth)");
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Sign Out</Text>
        </TouchableOpacity>
      </SignedIn>
    </View>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: primaryColor,
  },
  signoutButton: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 20,
    margin: 20,
    backgroundColor: fifthColor,
  },
  email: {
    fontWeight: "bold",
    color: "white",
  },
});
