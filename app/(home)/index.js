import {
  Alert,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import * as LocationGeocoding from "expo-location";
import { Octicons, Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Carousel from "../../components/Carousel";
import Categories from "../../components/categories";
import Hotel from "../../components/Hotel";
import { supabase } from "../../supabase";

const index = () => {
  const [locationServicesEnabled, setLocationServicesEnabled] = useState(false);
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    "fetching your location ..."
  );
  const [data, setData] = useState([]);

  useEffect(() => {
    CheckIfLocationEnabled();
  }, []);

  const CheckIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();
    if (!enabled) {
      Alert.alert(
        "Location Services not enabled",
        "Please enable your location services to continue",
        [{ text: "OK" }],
        { cancelable: false }
      );
    } else {
      setLocationServicesEnabled(true);
      GetCurrentLocation(); // Move this here to ensure it runs only if location services are enabled
    }
  };

  const GetCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync(); // Use foreground permissions for most cases

    if (status !== "granted") {
      Alert.alert(
        "Permission not granted",
        "Allow the app to use the location service",
        [{ text: "OK" }],
        { cancelable: false }
      );
      return; // Exit the function if permission is not granted
    }

    try {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      console.log(location);
      let { coords } = location;
      if (coords) {
        const { latitude, longitude } = coords;

        let response = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });

        if (response.length > 0) {
          const address = response[0];
          let addressString = `${address.name}, ${address.postalCode}, ${address.city}`;
          setDisplayCurrentAddress(addressString);
        }
      }
    } catch (error) {
      console.error("Error fetching location:", error);
      Alert.alert(
        "Error",
        "An error occurred while fetching the location",
        [{ text: "OK" }],
        { cancelable: false }
      );
    }
  };

  console.log("my address", displayCurrentAddress);
  0.3;
  const recommended = [
    {
      id: 0,
      name: "Nandhana Palace",
      image:
        "https://b.zmtcdn.com/data/pictures/chains/3/50713/81d0735ce259a6bf800e16bb54cb9e5e.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A",
      time: "35 - 45",
      type: "Andhra",
    },
    {
      id: 1,
      name: "GFC Biriyani",
      image:
        "https://b.zmtcdn.com/data/pictures/0/20844770/f9582144619b80d30566f497a02e2c8d.jpg?output-format=webp&fit=around|771.75:416.25&crop=771.75:416.25;*,*",
      time: "10 - 35",
      type: "North Indian",
    },
    {
      id: 2,
      name: "Happiness Dhaba",
      image:
        "https://b.zmtcdn.com/data/reviews_photos/2f1/c66cf9c2c68f652db16f2c0a6188a2f1_1659295848.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A",
      time: "20 - 25",
      type: "North Indian",
    },
  ];
  const items = [
    {
      id: "0",
      name: "Offers",
      description: "Upto 50% off",
      image: "https://cdn-icons-png.flaticon.com/128/9356/9356378.png",
    },
    {
      id: "1",
      name: "Legends",
      description: "Across India",
      image: "https://cdn-icons-png.flaticon.com/128/8302/8302686.png",
    },
    {
      id: "2",
      name: "Gourmet",
      description: "Selections",
      image: "https://cdn-icons-png.flaticon.com/128/1065/1065715.png",
    },
    {
      id: "3",
      name: "Healthy",
      description: "Curated dishes",
      image: "https://cdn-icons-png.flaticon.com/128/415/415744.png",
    },
  ];

  useEffect(() => {
    async function fetchData() {
      try {
        const { data, error } = await supabase.from("hotels").select("*");
        console.log("Data:", data);
        if (error) {
          console.error("Error fetching data:", error);
        } else {
          setData(data);
        }
      } catch (error) {
        console.error("Error in fetchData:", error);
      }
    }

    fetchData();
  }, []);

  console.log("data", data);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#f8f8f8" }}>
      <View
        style={{
          justifyContent: "center",
          alignContent: "center",
          margin: "auto",
        }}
      >
        <View
          style={{
            width: "90%",
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Text style={{ color: "#e52850", fontSize: 25, fontWeight: "700" }}>
            Foody
          </Text>

          <Ionicons name="person" size={24} color="#e52850" />
        </View>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignContent: "center",
          margin: "auto",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
            padding: 10,
            width: "96%",
            marginTop: 10,
            borderRadius: 30,
            backgroundColor: "#E52850",
          }}
        >
          <Octicons name="location" size={24} color="white" />
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold", color: "white" }}>
              Deliver To
            </Text>
            <Text style={{ color: "white", fontSize: 14, marginTop: 3 }}>
              {displayCurrentAddress}
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderWidth: 1,
          borderColor: "#C0C0C0",
          paddingVertical: 8,
          paddingHorizontal: 10,
          borderRadius: 11,
          marginTop: 10,
          marginHorizontal: 10,
          marginBottom: 10,
        }}
      >
        <TextInput placeholder="Search for food, hotels" />
        <AntDesign name="search1" size={24} color="#E52B50" />
      </View>

      <Carousel />

      <Categories />

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {recommended?.map((item, index) => (
          <View
            key={index}
            style={{
              backgroundColor: "white",
              flexDirection: "row",
              margin: 10,
              borderRadius: 8,
            }}
          >
            <View>
              <Image
                style={{
                  width: 100,
                  height: 100,
                  resizeMode: "cover",
                  borderTopLeftRadius: 8,
                  borderBottomLeftRadius: 7,
                }}
                source={{ uri: item?.image }}
              />
            </View>
            <View style={{ padding: 10, flexDirection: "column" }}>
              <Text style={{ fontSize: 15, fontWeight: "500" }}>
                {item?.name}
              </Text>
              <Text
                style={{
                  flex: 1,
                  marginTop: 3,
                  color: "gray",
                  fontWeight: "500",
                }}
              >
                {item?.type}
              </Text>

              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
              >
                <Ionicons name="time" size={24} color="green" />
                <Text>{item?.time} mins</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <Text
        style={{
          textAlign: "center",
          marginTop: 7,
          letterSpacing: 4,
          marginBottom: 5,
          color: "gray",
        }}
      >
        EXPLORE
      </Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {items?.map((item, index) => (
          <View
            key={index}
            style={{
              width: 90,
              borderColor: "#E0E0E0",
              borderWidth: 1,
              paddingVertical: 5,
              paddingHorizontal: 1,
              borderRadius: 5,
              marginLeft: 10,
              marginVertical: 10,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "white",
            }}
          >
            <Image
              style={{ width: 50, height: 50 }}
              source={{ uri: item?.image }}
            />

            <Text style={{ fontSize: 13, fontWeight: "500", marginTop: 6 }}>
              {item?.name}
            </Text>

            <Text style={{ fontSize: 12, color: "gray", marginTop: 3 }}>
              {item?.description}
            </Text>
          </View>
        ))}
      </ScrollView>

      <Text
        style={{
          textAlign: "center",
          marginTop: 7,
          letterSpacing: 4,
          marginBottom: 5,
          color: "gray",
        }}
      >
        ALL RESTAURANTS
      </Text>

      <View style={{ marginHorizontal: 8 }}>
        {data?.map((item, index) => (
          <Hotel key={index} item={item} menu={item?.menu} />
        ))}
      </View>
    </ScrollView>
  );
};

export default index;

const styles = StyleSheet.create({});
