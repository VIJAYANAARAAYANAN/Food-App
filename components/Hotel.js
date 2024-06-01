import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
const Hotel = ({ item }) => {
  const router = useRouter();
  return (
    <Pressable
      style={{
        marginHorizontal: 6,
        marginVertical: 12,
        borderRadius: 20,
        backgroundColor: "white",
        borderRadius: 10,
      }}
      onPress={() =>
        router.push({
          pathname: "/hotel",
          params: {
            id: item.id,
            name: item.name,
            address: item.address,
            smalladdress: item.smalladdress,
            cuisines: item.cuisines,
            aggregate_rating: item.aggregate_rating,
          },
        })
      }
    >
      <Image
        style={{
          with: "100%",
          aspectRatio: 6 / 4,
          borderTopLeftRadius: 6,
          borderTopRightRadius: 6,
        }}
        source={{ uri: item?.featured_image }}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{}}>
          <Text
            style={{
              paddingHorizontal: 10,
              marginTop: 10,
              fontSize: 16,
              fontWeight: "600",
            }}
          >
            {item?.name}
          </Text>
          <Text
            style={{
              paddingHorizontal: 10,
              marginTop: 3,
              fontSize: 14,
              fontWeight: "500",
              color: "grey",
            }}
          >
            North Indian * FastFood * 160 for one
          </Text>
          <Text
            style={{
              paddingHorizontal: 10,
              marginTop: 3,
              fontSize: 14,
              fontWeight: "500",
              color: "#505050",
            }}
          >
            {item?.time}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#006A4E",
            borderRadius: 5,
            paddingHorizontal: 4,
            paddingVertical: 5,
            marginRight: 10,
            gap: 3,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "white",
              paddingRight: 3,
            }}
          >
            {item?.aggregate_rating}
          </Text>
          <AntDesign name="star" size={14} color="white" />
        </View>
      </View>

      <View
        style={{
          borderWidth: 0.5,
          borderColor: "#c8c8c8c",
          marginHorizontal: 10,
          marginVertical: 4,
        }}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 4,
          marginHorizontal: 8,
          marginVertical: 5,
        }}
      >
        <MaterialCommunityIcons
          name="brightness-percent"
          size={24}
          color="#1f75fe"
        />
        <Text style={{ marginLeft: 2, color: "#1f75fe", fontWeight: "500" }}>
          20% OFF upto Rs 100
        </Text>
      </View>
    </Pressable>
  );
};

export default Hotel;

const styles = StyleSheet.create({});
