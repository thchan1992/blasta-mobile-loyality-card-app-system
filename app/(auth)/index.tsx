import React from "react";
import { SignedIn, SignedOut, useUser, useClerk } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { Text, View, Button } from "react-native";
import {
  fourthColor,
  primaryColor,
  secondaryColor,
  thirdColor,
} from "../util/color";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { getScreenHeight, getScreenWidth } from "../util/dimensions";
export default function Page() {
  const { user } = useUser();

  return (
    <LinearGradient
      colors={[secondaryColor, primaryColor]}
      style={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        borderWidth: 1,
        width: "100%",
      }}
    >
      {/* <SignedIn>
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
      </SignedIn> */}
      <SignedOut>
        <View
          style={{ flex: 6 }}
          // style={{
          //   justifyContent: "center",
          //   alignItems: "center",
          //   height: getScreenHeight() * 0.7,

          //   width: getScreenWidth() * 0.7,
          //   borderRadius: 10,
          //   shadowColor: "black",
          //   shadowOpacity: 50,
          //   shadowRadius: 3,
          //   backgroundColor: thirdColor,
          //   borderColor: "grey",
          // }}
        >
          {/* <Text>Hello</Text> */}
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Link
            href="/sign-in"
            // href="/registration"
            style={{
              height: "70%",
              width: "50%",
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: fourthColor,
                borderRadius: 10,
                width: getScreenWidth() * 0.7,
                height: "70%",
                justifyContent: "center",
                alignItems: "center",
                margin: 10,
                borderWidth: 1,
              }}
            >
              <Text style={{ fontWeight: "bold", textAlign: "center" }}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </SignedOut>
    </LinearGradient>
  );
}

{
  /* <View
  style={{
    justifyContent: "center",
    alignItems: "center",
    height: getScreenHeight() * 0.7,

    width: getScreenWidth() * 0.7,
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 50,
    shadowRadius: 3,
    backgroundColor: thirdColor,
    borderColor: "grey",
  }}
> */
}
//   <View
//     style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
//   >
//     <Link
//       href="/sign-in"
//       style={{
//         height: "70%",
//         width: "50%",
//       }}
//     >
//       <TouchableOpacity
//         style={{
//           backgroundColor: fourthColor,
//           borderRadius: 10,
//           width: getScreenWidth() * 0.5,
//           height: "100%",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <View
//           style={{
//             width: "100%",
//           }}
//         >
//           <Text style={{ fontWeight: "bold", textAlign: "center" }}>
//             Sign In
//           </Text>
//         </View>
//       </TouchableOpacity>
//     </Link>
//   </View>
//   <View style={{ flex: 1 }}>
//     <Link
//       href="/sign-up"
//       style={{
//         height: "70%",
//         width: "50%",
//       }}
//     >
//       <TouchableOpacity
//         style={{
//           backgroundColor: fourthColor,
//           borderRadius: 10,
//           width: getScreenWidth() * 0.5,
//           height: "100%",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <Text style={{ fontWeight: "bold", textAlign: "center" }}>
//           Sign Up
//         </Text>
//       </TouchableOpacity>
//     </Link>
//   </View>
//   {/* </View> */}
//   <View style={{ flex: 1 }}>
// <Link href="/reset">
//   <TouchableOpacity>
//     <Text style={{ fontWeight: "bold", marginTop: 10 }}>
//       Forget Password
//     </Text>
//   </TouchableOpacity>
// </Link>
//   </View>
// </View>
