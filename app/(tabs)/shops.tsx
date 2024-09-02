import React, { useEffect, useState } from "react";
import {
  SignedIn,
  SignedOut,
  useUser,
  useClerk,
  useAuth,
} from "@clerk/clerk-expo";
import { Text, View } from "react-native";
import axios from "axios";

export default function Page() {
  const { getToken } = useAuth();
  const [customerData, setCustomerData] = useState<any[]>([]);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const token = await getToken();
        const response = await axios.get(
          "http://localhost:3000/api/customer/view",
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
  }, []);

  return (
    <View>
      <SignedIn>
        <View>
          {customerData.map((item) => {
            return (
              <View key={item._id}>
                <Text>Name: {item.businessId.name}</Text>
                <Text>Count: {item.count}</Text>
              </View>
            );
          })}
        </View>
        <Text>Shops</Text>
      </SignedIn>
    </View>
  );
}
