import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import moment from "moment";
import MapView, { Marker, Polyline } from "react-native-maps";

const Order = () => {
  const params = useLocalSearchParams();
  const [tip, setTip] = useState(0);
  const time = moment().format("LT");
  const mapView = useRef(null); // Corrected 'mapView' with an uppercase 'M'
  const [coordinates] = useState([
    {
      latitude: 12.9716,
      longitude: 77.5946,
    },
    {
      latitude: 13.0451,
      longitude: 77.6269,
    },
  ]);

  useEffect(() => {
    mapView.current.fitToCoordinates(coordinates, {
      edgePadding: {
        top: 50,
        bottom: 50,
        left: 50,
        right: 50,
      },
    });
  }, []);

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
        ref={mapView} // Corrected 'mapView' with an uppercase 'M'
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={{ width: "100%", height: 400 }}
      >
        <Marker coordinate={coordinates[0]}></Marker>
        <Marker coordinate={coordinates[1]}></Marker>

        <Polyline
          coordinates={coordinates}
          strokeColor="black"
          lineDashPattern={[4]}
          strokeWidth={1}
        />
      </MapView>
    </SafeAreaView>
  );
};

export default Order;

const styles = StyleSheet.create({});
