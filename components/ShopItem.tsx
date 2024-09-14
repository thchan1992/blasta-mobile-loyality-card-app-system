import { secondaryColor } from "@/app/util/color";
import { getScreenHeight } from "@/app/util/dimensions";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const ShopItem = ({ customerData }: { customerData: any }) => {
  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

  return (
    <View style={styles.shopListContainer}>
      <Text style={styles.titleText}>Your Shop(s)</Text>
      {customerData.map((item: any) => {
        return (
          <View style={styles.shopItemContainer} key={item._id}>
            <View style={styles.descContainer}>
              <Text style={styles.companyName}>{item.businessId.name}</Text>

              <Text style={styles.stamp}>{item.count} Stamp(s)</Text>

              <Text style={styles.reward}>
                Available Reward(s):{" "}
                {Math.round(item.count / item.businessId.loyaltyProgram) > 0
                  ? Math.round(item.count / item.businessId.loyaltyProgram)
                  : "0"}
              </Text>
            </View>
            <View style={styles.logoContainer}>
              <Image
                style={styles.logo}
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
  );
};

const styles = StyleSheet.create({
  shopListContainer: { paddingTop: 20, marginHorizontal: 10 },
  titleText: {
    fontSize: getScreenHeight() * 0.03,
    padding: 10,
    fontWeight: "bold",
    color: "white",
  },
  shopItemContainer: {
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
  },
  descContainer: {
    padding: 10,
    flex: 1,
  },
  companyName: {
    fontWeight: "bold",
    fontSize: getScreenHeight() * 0.03,
    flexWrap: "wrap",
  },
  stamp: {
    fontWeight: "bold",
    color: "black",
    paddingTop: 10,
  },
  reward: {
    fontWeight: "bold",
    paddingTop: 3,
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "flex-end",
    flex: 1,
    padding: 10,
  },
  logo: {
    flex: 1,
    width: getScreenHeight() * 0.18,
    backgroundColor: "white",
    borderRadius: 20,
  },
});
