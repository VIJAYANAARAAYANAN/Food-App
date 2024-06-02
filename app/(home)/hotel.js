import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Animated,
  Image,
} from "react-native";
import React, { useRef, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Fooditem from "../../components/Fooditem";
import { useSelector } from "react-redux";
import Modal from "react-native-modal";
const hotel = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  const cart = useSelector((state) => state.cart.cart);
  console.log("Items in cart");
  console.log(cart);
  const menu = [
    {
      id: "20",
      name: "Recommended",
      items: [
        {
          id: "101",
          name: "Paneer 65",
          price: 275,
          description:
            "This is served with Raita and gravy and has loaded with chilli paste mixed chicken Kebabs",
          rating: 4.1,
          ratings: 43,
          image:
            "https://www.cookwithmanali.com/wp-content/uploads/2015/07/Restaurant-Style-Recipe-Paneer-Tikka.jpg",
          veg: true,
          bestSeller: false,
          quantity: 1,
        },
        {
          id: "102",
          name: "Chilly Chicken (Boneless)",
          price: 285,
          description:
            "E: 604.42 KCal (163.36 KCal), C: 29.67 Grams (8.02 Grams), P: 50.63 Grams (13.68 Grams), F: 30.94 Grams (8.36 Grams)",
          rating: 4.3,
          ratings: 34,
          image:
            "https://www.yummytummyaarthi.com/wp-content/uploads/2023/03/chilli-chicken-dry-1.jpeg",
          veg: false,
          bestSeller: true,
          quantity: 1,
        },
        {
          id: "103",
          name: "Spl Veg Biryani",
          price: 250,
          description:
            "E: 1327.35 KCal (126.41 KCal), C: 213.24 Grams (20.31 Grams), P: 26.99 Grams (2.57 Grams), F: 38.46 Grams (3.66 Grams)",
          rating: 4.5,
          ratings: 56,
          image:
            "https://www.yummytummyaarthi.com/wp-content/uploads/2023/03/chilli-chicken-dry-1.jpeg",
          veg: true,
          bestSeller: false,
          quantity: 1,
        },
        {
          id: "104",
          name: "Chilly Paneer",
          price: 220,
          description:
            "E: 871.69 KCal (272.40 KCal), C: 21.54 Grams (6.73 Grams), P: 51.90 Grams (16.22 Grams), F: 64.36 Grams (20.11 Grams",
          rating: 3.8,
          ratings: 22,
          image:
            "https://www.yummytummyaarthi.com/wp-content/uploads/2023/03/chilli-chicken-dry-1.jpeg",
          veg: true,
          bestSeller: true,
          quantity: 1,
        },
        {
          id: "105",
          name: "Chicken 65",
          price: 300,
          description:
            "E: 544.39 KCal (155.54 KCal), C: 25.11 Grams (7.17 Grams), P: 45.15 Grams (12.90 Grams), F: 27.91 Grams (7.97 Grams)",
          rating: 4.5,
          ratings: 45,
          image:
            "https://www.yummytummyaarthi.com/wp-content/uploads/2023/03/chilli-chicken-dry-1.jpeg",
          veg: false,
          bestSeller: true,
          quantity: 1,
        },
      ],
    },
    {
      id: "11",
      name: "Rice",
      items: [
        {
          id: "201",
          name: "Chicken Fried Rice",
          price: 260,
          description:
            "E: 1142.26 KCal (163.18 KCal), C: 125.05 Grams (17.86 Grams), P: 40.11 Grams (5.73 Grams), F: 51.37 Grams (7.34 Grams)",
          rating: 4.3,
          ratings: 34,
          image:
            "https://www.yummytummyaarthi.com/wp-content/uploads/2023/03/chilli-chicken-dry-1.jpeg",
          veg: false,
          bestSeller: true,
        },
        {
          id: "202",
          name: "Egg Fried Rice",
          price: 220,
          description:
            "E: 1729.51 KCal (164.72 KCal), C: 204.54 Grams (19.48 Grams), P: 44.03 Grams (4.19 Grams), F: 79.02 Grams (7.53 Grams)",
          rating: 4.3,
          ratings: 52,
          image:
            "https://www.yummytummyaarthi.com/wp-content/uploads/2023/03/chilli-chicken-dry-1.jpeg",
          veg: false,
          bestSeller: false,
        },
        {
          id: "203",
          name: "Veg Fried Rice",
          price: 190,
          description:
            "E: 1477.00 KCal (140.67 KCal), C: 204.14 Grams (19.44 Grams), P: 22.90 Grams (2.18 Grams), F: 59.95 Grams (5.71 Grams)",
          rating: 4.6,
          ratings: 56,
          image:
            "https://www.yummytummyaarthi.com/wp-content/uploads/2023/03/chilli-chicken-dry-1.jpeg",
          veg: true,
          bestSeller: true,
        },
        {
          id: "204",
          name: "Jeera Rice",
          price: 195,
          description:
            "E: 1832.30 KCal (174.50 KCal), C: 246.73 Grams (23.50 Grams), P: 27.51 Grams (2.62 Grams), F: 78.15 Grams (7.44 Grams)",
          rating: 4.5,
          ratings: 48,
          image:
            "https://www.yummytummyaarthi.com/wp-content/uploads/2023/03/chilli-chicken-dry-1.jpeg",
          veg: true,
          bestSeller: false,
        },
      ],
    },
  ];

  const scrollViewRef = useRef(null);
  const scrollAnim = useRef(new Animated.Value(0)).current;
  const ITEM_HEIGHT = 650;
  const scrollToCategory = (index) => {
    const yOffset = index * ITEM_HEIGHT;
    Animated.timing(scrollAnim, {
      toValue: yOffset,
      duration: 500,
      useNativeDriver: true,
    }).start();
    scrollViewRef.current.scrollTo({ y: yOffset, animated: true });
  };

  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <ScrollView ref={scrollViewRef} style={{ backgroundColor: "white" }}>
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
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            {params?.name}
          </Text>
          <Text
            style={{
              marginTop: 5,
              color: "grey",
              fontWeight: "500",
              fontSize: 13,
            }}
          >
            North Indian * South Indians * Fast Food * 160 for one
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
              <Text
                style={{ color: "white", fontSize: 15, fontWeight: "bold" }}
              >
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

        {menu?.map((item, index) => (
          <Fooditem key={index} item={item} />
        ))}
      </ScrollView>

      <View style={{ flexDirection: "row", backgroundColor: "white" }}>
        {menu?.map((item, index) => (
          <Pressable
            onPress={() => scrollToCategory(index)}
            style={{
              paddingHorizontal: 7,
              borderRadius: 5,
              paddingVertical: 5,
              marginVertical: 10,
              marginHorizontal: 10,
              alignItems: "center",
              justifyContent: "center",
              borderColor: "#fd5c63",
              borderWidth: 1,
            }}
          >
            <Text>{item?.name}</Text>
          </Pressable>
        ))}
      </View>

      <Pressable
        onPress={() => setModalVisible(!modalVisible)}
        style={{
          backgroundColor: "black",
          width: 60,
          height: 60,
          borderRadius: 30,
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          right: 25,
          bottom: cart?.length > 0 ? 70 : 35,
        }}
      >
        <Ionicons
          style={{ textAlign: "center" }}
          name="fast-food-outline"
          size={24}
          color="white"
        />
        <Text
          style={{
            textAlign: "center",
            color: "white",
            fontWeight: "500",
            fontSize: 11,
            marginTop: 3,
          }}
        >
          Menu
        </Text>
      </Pressable>

      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(!modalVisible)}
      >
        <View
          style={{
            backgroundColor: "black",
            width: 250,
            height: 190,
            position: "absolute",
            bottom: 35,
            right: 10,
            borderRadius: 7,
          }}
        >
          {menu?.map((item, index) => (
            <View
              style={{
                padding: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{ color: "#d0d0d0", fontSize: 16, fontWeight: "600" }}
              >
                {" "}
                {item?.name}
              </Text>
              <Text
                style={{ color: "#d0d0d0", fontSize: 16, fontWeight: "600" }}
              >
                {item?.items?.length}
              </Text>
            </View>
          ))}
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Image
              style={{ width: "100%", height: 80, resizeMode: "contain" }}
              source={{
                uri: "https://cdn.dribbble.com/userupload/14683000/file/original-a9a8ef8e6c89a6a25ae297b21245680c.jpg?resize=1024x768",
              }}
            />
          </View>
        </View>
      </Modal>

      {cart.length > 0 && (
        <Pressable
          onPress={() =>
            router.push({
              pathname: "/cart",
              params: {
                name: params.name,
              },
            })
          }
          style={{
            backgroundColor: "#fd5c63",
            paddingHorizontal: 10,
            paddingVertical: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontSize: 16,
              fontWeight: "600",
            }}
          >
            {cart.length} items added
          </Text>
          <Text
            style={{
              textAlign: "center",
              color: "white",
              marginTop: 5,
              fontWeight: "600",
            }}
          >
            Add items(s) worth 240 to reduce surge fee by Rs 35.
          </Text>
        </Pressable>
      )}
    </>
  );
};

export default hotel;

const styles = StyleSheet.create({});
