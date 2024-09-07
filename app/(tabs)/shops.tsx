import React, { useEffect, useState } from "react";
import {
  SignedIn,
  SignedOut,
  useUser,
  useClerk,
  useAuth,
} from "@clerk/clerk-expo";
import { Text, View, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import axios from "axios";
import {
  fifthColor,
  fourthColor,
  primaryColor,
  secondaryColor,
  thirdColor,
} from "../util/color";
import { LinearGradient } from "expo-linear-gradient";

export default function Page() {
  const { getToken } = useAuth();
  const [customerData, setCustomerData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const token = await getToken();
        const response = await axios.get(
          "https://blasto-red.vercel.app/api/customer/view",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data.data.stamps[0]);
        setCustomerData(response.data.data.stamps);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCustomerData();
    setIsLoading(false);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        colors={[secondaryColor, primaryColor]}
        style={styles.container}
      >
        <SignedIn>
          {isLoading === false ? (
            <ScrollView style={{ flex: 1, width: "100%" }}>
              <View style={{ paddingTop: 20 }}>
                {customerData.map((item) => {
                  return (
                    <View
                      style={{
                        padding: 5,
                        flex: 1,
                        margin: 5,
                        backgroundColor: thirdColor,
                        borderRadius: 10,
                        shadowColor: "black",
                        shadowOpacity: 80,
                        shadowRadius: 5,
                      }}
                      key={item._id}
                    >
                      <View
                        style={{
                          padding: 10,
                        }}
                      >
                        <Text>
                          <Text style={{ fontWeight: "bold" }}>Name:</Text>{" "}
                          {item.businessId.name}
                        </Text>
                        <Text>
                          <Text style={{ fontWeight: "bold" }}>Count:</Text>{" "}
                          {item.count}
                        </Text>
                        <Text>
                          <Text style={{ fontWeight: "bold" }}>Reward(s):</Text>{" "}
                          {item.businessId.loyaltyProgram / item.count > 0
                            ? Math.round(
                                item.businessId.loyaltyProgram / item.count
                              )
                            : "No reward"}
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            </ScrollView>
          ) : (
            <View>
              <Text>Loading...</Text>
            </View>
          )}
        </SignedIn>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",

    backgroundColor: primaryColor,
  },
});
