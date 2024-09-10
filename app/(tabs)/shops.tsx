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
import { Image } from "expo-image";
import { getScreenHeight } from "../util/dimensions";
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
      } finally {
        setIsLoading(false);
      }
    };
    fetchCustomerData();
  }, []);

  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        colors={[secondaryColor, primaryColor]}
        style={styles.container}
      >
        <SignedIn>
          {isLoading === false ? (
            <ScrollView style={{ flex: 1, width: "100%" }}>
              <View style={{ paddingTop: 20, marginHorizontal: 10 }}>
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
                        flexDirection: "row",
                        height: getScreenHeight() * 0.2,
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
                          {Math.round(
                            item.count / item.businessId.loyaltyProgram
                          ) > 0
                            ? Math.round(
                                item.count / item.businessId.loyaltyProgram
                              )
                            : "No reward"}
                        </Text>
                      </View>
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "flex-end",
                          flex: 1,
                          padding: 10,
                        }}
                      >
                        <Image
                          style={{
                            flex: 1,
                            width: "100%",
                            backgroundColor: "white",
                          }}
                          source={item.businessId.logo}
                          placeholder={{ blurhash }}
                          contentFit="cover"
                          transition={1000}
                        />
                      </View>
                    </View>
                  );
                })}
              </View>
            </ScrollView>
          ) : (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
              }}
            >
              <Text>Loading...</Text>
            </View>
          )}
          {customerData.length === 0 && (
            <View>
              <Text>No Stamp</Text>
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
