import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import Menuitem from "./Menuitem";

const Fooditem = ({ item }) => {
  const data = [item];
  return (
    <View>
      {data?.map((item, index) => (
        <>
          <Pressable
            style={{
              margin: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            key={index}
          >
            <Text
              style={{ fontSize: 19, fontWeight: "bold", color: "#E52850" }}
            >
              {item?.name} ({item?.items?.length})
            </Text>
            <AntDesign name="down" size={20} color="black" />
          </Pressable>

          {item?.items?.map((item, index) => (
            <Menuitem key={index} item={item} />
          ))}
        </>
      ))}
    </View>
  );
};

export default Fooditem;

const styles = StyleSheet.create({});
