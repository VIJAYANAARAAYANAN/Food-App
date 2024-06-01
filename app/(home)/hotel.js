import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
const hotel = () => {
  const params = useLocalSearchParams();

  const router = useRouter();
  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View
        style={{
          marginTop: 5,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Ionicons
          onPress={() => router.back()}
          style={{ padding: 5 }}
          name="arrow-back"
          size={24}
          color="black"
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 14,
            gap: 15,
          }}
        >
          <SimpleLineIcons name="camera" size={24} color="black" />
          <Ionicons name="bookmark-outline" size={24} color="black" />
          <MaterialCommunityIcons
            name="share-outline"
            size={24}
            color="black"
          />
        </View>
      </View>

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginVertical: 12,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>{params?.name}</Text>
        <Text
          style={{
            marginTop: 5,
            color: "grey",
            fontWeight: "500",
            fontSize: 13,
          }}
        >
          North Indian * South Indian * Fast Food * 160 for one
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 4,
            marginTop: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#006a4e",
              borderRadius: 5,
              paddingHorizontal: 4,
              paddingVertical: 5,
              gap: 6,
            }}
          >
            <Text style={{ color: "white", fontSize: 15, fontWeight: "bold" }}>
              {params?.aggregate_rating}
            </Text>
            <AntDesign name="star" size={14} color="white" />
          </View>
          <Text style={{ fontSize: 14, fontWeight: "500", marginLeft: 5 }}>
            3.2k Ratings
          </Text>
        </View>

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#d0f0c0",
            borderRadius: 20,
            paddingHorizontal: 10,
            paddingVertical: 5,
            marginTop: 12,
          }}
        >
          <Text>30 - 40 minutes * 6km | Banglore</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default hotel;

const styles = StyleSheet.create({});
