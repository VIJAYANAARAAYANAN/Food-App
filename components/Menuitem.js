import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";

const Menuitem = ({ item }) => {
  return (
    <View>
      <Pressable
        style={{
          margin: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 15,
        }}
      >
        <View>
          <Text style={{ fontSize: 18, fontWeight: "600", width: "80%" }}>
            {item?.name}
          </Text>
          <Text style={{ marginTop: 5, fontSize: 15, fontWeight: "500" }}>
            ₹{item?.price}
          </Text>
          <Text
            style={{
              marginTop: 5,
              borderRadius: 4,
            }}
          >
            {[0, 0, 0, 0, 0].map((en, i) => (
              <FontAwesome
                // key={`${food.id}-${i}`}
                key={i}
                style={{ paddingHorizontal: 3 }}
                name={i < Math.floor(item.rating) ? "star" : "star-o"}
                size={15}
                color="#FFD700"
              />
            ))}
          </Text>
          <Text
            style={{ width: 200, marginTop: 8, color: "grey", fontSize: 16 }}
          >
            {item?.description.length > 40
              ? item?.description.substr(0, 37) + "..."
              : item?.description}
          </Text>
        </View>
        <Pressable style={{ marginRight: 10 }}>
          <Image
            style={{ width: 100, height: 100, borderRadius: 10 }}
            source={{ uri: item?.image }}
          />
        </Pressable>
      </Pressable>
    </View>
  );
};

export default Menuitem;

const styles = StyleSheet.create({});
