import React, { useEffect, useState } from "react";
import { SignedIn, useAuth } from "@clerk/clerk-expo";
import { Text, View, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import axios from "axios";
import { fourthColor } from "../util/color";
import { getScreenHeight } from "../util/dimensions";
import { ShopItem } from "@/components/ShopItem";
import { CustomerData } from "../../types/types";

export default function Page() {
  const { getToken } = useAuth();
  const [customerData, setCustomerData] = useState<CustomerData[]>([]);
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

        console.log(response.data.data.stamps, "re.stamps");

        setCustomerData(response.data.data.stamps);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCustomerData();
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <SignedIn>
          {isLoading === false ? (
            <ScrollView style={{ flex: 1, width: "100%" }}>
              <ShopItem customerData={customerData} />
            </ScrollView>
          ) : (
            <View
              style={{
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
  },
  titleText: {
    fontSize: getScreenHeight() * 0.03,
    padding: 10,
    fontWeight: "bold",
    color: "white",
  },
});

// const dummy = [
//   {
//     _id: "66d2f91fab7980fde2f0d666",
//     businessId: {
//       _id: "66d2f6cbab7980fde2f0d650",
//       logo: "https://i.imgur.com/rHa6UcT.png",
//       loyaltyProgram: 10,
//       name: "Lomions",
//     },
//     count: 1,
//   },
//   {
//     _id: "66d2f91fab7980fde2f0d667",
//     businessId: {
//       _id: "66d2f6cbab7980fde2f0d657",
//       logo: "https://i.imgur.com/rkjrusa.png",
//       loyaltyProgram: 5,
//       name: "Compiny",
//     },
//     count: 15,
//   },
//   {
//     _id: "66d2f91fab7980fde2f0d668",
//     businessId: {
//       _id: "66d2f6cbab7980fde2f0d658",
//       logo: "https://i.imgur.com/SEXv4Jd.png",
//       loyaltyProgram: 10,
//       name: "Big Business",
//     },
//     count: 24,
//   },
// ];

// setCustomerData(dummy);
