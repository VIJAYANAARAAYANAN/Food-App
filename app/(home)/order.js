import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import moment from "moment";
import MapView, { Marker, Polyline } from "react-native-maps";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import * as Location from "expo-location";
import * as LocationGeocoding from "expo-location";

const generateRandomLocation = (latitude, longitude, radiusInMeters) => {
  const getRandomOffset = (maxOffset) =>
    (Math.random() < 0.5 ? -1 : 1) * Math.random() * maxOffset;
  const earthRadius = 6371000; // Earth's radius in meters

  const maxLatOffset = (radiusInMeters / earthRadius) * (180 / Math.PI);
  const maxLngOffset = maxLatOffset / Math.cos(latitude * (Math.PI / 180));

  const newLatitude = latitude + getRandomOffset(maxLatOffset);
  const newLongitude = longitude + getRandomOffset(maxLngOffset);

  if (
    newLatitude < -90 ||
    newLatitude > 90 ||
    newLongitude < -180 ||
    newLongitude > 180
  ) {
    console.error("Invalid generated coordinates:", {
      newLatitude,
      newLongitude,
    });
    return null;
  }

  return {
    latitude: newLatitude,
    longitude: newLongitude,
  };
};

const Order = () => {
  const params = useLocalSearchParams();
  const [tip, setTip] = useState(0);
  const [locationServicesEnabled, setLocationServicesEnabled] = useState(false);
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    "Fetching your location..."
  );
  const [currentLocation, setCurrentLocation] = useState(null);
  const [coordinates, setCoordinates] = useState([]);
  const time = moment().format("LT");
  const mapView = useRef(null);

  useEffect(() => {
    CheckIfLocationEnabled();
    GetCurrentLocation();
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
    }
  };

  const GetCurrentLocation = async () => {
    let { status } = await Location.requestBackgroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission not granted",
        "Allow the app to use the location service",
        [{ text: "OK" }],
        { cancelable: false }
      );
      return;
    }

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    const { latitude, longitude } = location.coords;
    setCurrentLocation({ latitude, longitude });

    let response = await Location.reverseGeocodeAsync({ latitude, longitude });
    const address = await LocationGeocoding.reverseGeocodeAsync({
      latitude,
      longitude,
    });
    const streetAddress = address[0].name;

    for (let item of response) {
      let address = `${item.name}, ${item?.postalCode}, ${item?.city}`;
      setDisplayCurrentAddress(address);
    }

    // Generate random hotel locations
    const hotelLocations = {
      "Taco Bell": generateRandomLocation(latitude, longitude, 10000),
      "A2b AnandhaBhavan": generateRandomLocation(latitude, longitude, 10000),
      Whopper: generateRandomLocation(latitude, longitude, 10000),
    };

    const hotelName = params?.name;
    const hotelLocation = hotelLocations[hotelName];

    if (!hotelLocation) {
      Alert.alert("Error", "Invalid hotel location generated");
      return;
    }

    setCoordinates([{ latitude, longitude }, hotelLocation]);

    if (mapView.current) {
      mapView.current.fitToCoordinates(
        [{ latitude, longitude }, hotelLocation],
        {
          edgePadding: {
            top: 50,
            bottom: 50,
            left: 50,
            right: 50,
          },
        }
      );
    }
  };

  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          height: 60,
          backgroundColor: "#fd5c63",
          padding: 10,
        }}
      >
        <View>
          <Text style={{ color: "white", fontSize: 15, fontWeight: "600" }}>
            Delivery in 25 mins
          </Text>
          <Text style={{ color: "white", fontSize: 15, fontWeight: "600" }}>
            order placed at {time}
          </Text>
        </View>
        <Text style={{ color: "white", fontSize: 15, fontWeight: "600" }}>
          HELP
        </Text>
      </View>
      <MapView
        ref={mapView}
        initialRegion={{
          latitude: 11.0168,
          longitude: 76.9558,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={{ width: "100%", height: 400 }}
      >
        {coordinates.map((coord, index) => (
          <Marker key={index} coordinate={coord} />
        ))}
        {coordinates.length > 1 && (
          <Polyline
            coordinates={coordinates}
            strokeColor="black"
            lineDashPattern={[4]}
            strokeWidth={1}
          />
        )}
      </MapView>
      <View
        style={{
          height: 320,
          width: "100%",
          backgroundColor: "white",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        <View style={{ padding: 10 }}>
          <View>
            <Text
              style={{ fontWeight: "500", fontSize: 17, textAlign: "center" }}
            >
              {params?.name} has accepted your order
            </Text>
            <View style={{ flexDirection: "row", marginTop: 20 }}>
              <FontAwesome5
                name="hand-holding-heart"
                size={28}
                color="#fc8019"
              />
              <View style={{ marginLeft: 10 }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "500",
                    paddingHorizontal: 2,
                    marginBottom: 6,
                  }}
                >
                  Tip your hunger Saviour
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: "#696969",
                    marginRight: 30,
                    paddingHorizontal: 2,
                  }}
                >
                  Thank your delivery partner for helping you stay safe
                  indoors.Support them through these tough times with a tip
                </Text>
                <Pressable
                  style={{
                    paddingTop: 20,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => setTip(30)}
                    style={{
                      backgroundColor: "#F5F5F5",
                      marginHorizontal: 10,
                      paddingHorizontal: 10,
                      borderRadius: 7,
                    }}
                  >
                    <Text
                      style={{
                        padding: 10,
                        color: "#002D62",
                        fontWeight: "bold",
                      }}
                    >
                      ₹30
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => setTip(50)}
                    style={{
                      alignItems: "center",
                      backgroundColor: "#F5F5F5",
                      marginHorizontal: 10,
                      borderRadius: 7,
                    }}
                  >
                    <Text
                      style={{
                        padding: 4,
                        color: "#002D62",
                        fontWeight: "bold",
                      }}
                    >
                      ₹50
                    </Text>
                    <Text
                      style={{
                        backgroundColor: "orange",
                        paddingHorizontal: 10,
                        fontSize: 14,
                        fontWeight: "bold",
                        color: "white",
                      }}
                    >
                      Most Tipped
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => setTip(70)}
                    style={{
                      backgroundColor: "#F5F5F5",
                      marginHorizontal: 10,
                      paddingHorizontal: 10,
                      borderRadius: 7,
                    }}
                  >
                    <Text
                      style={{
                        padding: 10,
                        color: "#002D62",
                        fontWeight: "bold",
                      }}
                    >
                      ₹70
                    </Text>
                  </TouchableOpacity>
                </Pressable>
              </View>
            </View>
            {tip ? (
              <View>
                <Text
                  style={{
                    color: "#fc8019",
                    padding: 10,
                    marginLeft: 10,
                    marginRight: 10,
                    fontSize: 16,
                    fontWeight: "600",
                  }}
                >
                  please pay {"₹"}
                  {tip} to your delivery agent at the time of delivery
                </Text>
                <TouchableOpacity
                  onPress={() => setTip(0)}
                  activeOpacity={0.7}
                  style={{
                    padding: 10,
                    marginLeft: 10,
                    marginRight: 10,
                    position: "absolute",
                    top: 40,
                    paddingBottom: 40,
                  }}
                >
                  <Text
                    style={{ color: "red", fontSize: 14, fontWeight: "700" }}
                  >
                    (Cancel)
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Order;

const styles = StyleSheet.create({});
