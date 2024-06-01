import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

const Fooditem = ({ item }) => {
  const data = [item];
  return (
    <View>
      {data?.map((item, index) => (
        <Pressable
          style={{
            margin: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          key={index}
        >
          <Text>
            {item?.name} ({item?.items?.length}3)
          </Text>
          <AntDesign name="down" size={20} color="black" />
        </Pressable>
      ))}
    </View>
  );
};

export default Fooditem;

const styles = StyleSheet.create({});
