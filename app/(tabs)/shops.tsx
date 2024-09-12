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

        const dummy = [
          {
            _id: "66d2f91fab7980fde2f0d666",
            businessId: {
              _id: "66d2f6cbab7980fde2f0d650",
              logo: "https://i.imgur.com/rHa6UcT.png",
              loyaltyProgram: 10,
              name: "Lomions",
            },
            count: 1,
          },
          {
            _id: "66d2f91fab7980fde2f0d667",
            businessId: {
              _id: "66d2f6cbab7980fde2f0d657",
              logo: "https://i.imgur.com/rkjrusa.png",
              loyaltyProgram: 5,
              name: "Compiny",
            },
            count: 15,
          },
          {
            _id: "66d2f91fab7980fde2f0d668",
            businessId: {
              _id: "66d2f6cbab7980fde2f0d658",
              logo: "https://i.imgur.com/SEXv4Jd.png",
              loyaltyProgram: 10,
              name: "Big Business",
            },
            count: 24,
          },
        ];

        setCustomerData(dummy);
        // setCustomerData(response.data.data.stamps);
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
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <SignedIn>
          {isLoading === false ? (
            <ScrollView style={{ flex: 1, width: "100%" }}>
              <View style={{ paddingTop: 20, marginHorizontal: 10 }}>
                <Text style={styles.titleText}>Your Shop(s)</Text>
                {customerData.map((item) => {
                  return (
                    <View
                      style={{
                        padding: 5,
                        flex: 2,
                        margin: 5,
                        backgroundColor: secondaryColor,
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

                          flex: 1,
                        }}
                      >
                        <Text
                          style={{
                            fontWeight: "bold",
                            fontSize: getScreenHeight() * 0.03,
                            flexWrap: "wrap",
                          }}
                        >
                          {item.businessId.name}
                        </Text>

                        <Text
                          style={{
                            fontWeight: "bold",
                            color: "black",
                            paddingTop: 10,
                          }}
                        >
                          {item.count} Stamp(s)
                        </Text>

                        <Text style={{ fontWeight: "bold", paddingTop: 3 }}>
                          Available Reward(s):{" "}
                          {Math.round(
                            item.count / item.businessId.loyaltyProgram
                          ) > 0
                            ? Math.round(
                                item.count / item.businessId.loyaltyProgram
                              )
                            : "0"}
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
                            width: getScreenHeight() * 0.18,
                            backgroundColor: "white",
                            borderRadius: 20,
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
                // justifyContent: "center",
                alignItems: "center",
                flex: 1,
              }}
            >
              <Text style={{ color: fourthColor, fontWeight: "bold" }}>
                Loading...
              </Text>
            </View>
          )}
          {customerData.length === 0 && (
            <View
              style={{
                alignItems: "center",
                flex: 1,
              }}
            >
              <Text style={{ color: fourthColor, fontWeight: "bold" }}>
                No Stamp(s)
              </Text>
            </View>
          )}
        </SignedIn>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    // justifyContent: "center",
    // alignItems: "center",

    // backgroundColor: primaryColor,
  },
  titleText: {
    fontSize: getScreenHeight() * 0.03,
    padding: 10,
    fontWeight: "bold",
    color: "white",
  },
});
