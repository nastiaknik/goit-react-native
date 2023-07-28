import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Constants from "expo-constants";
const { GOOGLE_MAPS_API_KEY } = Constants.manifest.extra;
import styles from "./MapScreenStyles";

const MapScreen = ({ route }) => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    if (route?.params?.location) {
      const { latitude, longitude } = route.params.location;
      setLatitude(latitude);
      setLongitude(longitude);
    }
  }, [route]);

  const coords = {
    latitude,
    longitude,
    latitudeDelta: 0.001,
    longitudeDelta: 0.006,
  };

  return (
    <View style={styles.container}>
      {latitude && longitude ? (
        <MapView 
        style={styles.map}
        initialRegion={coords}
        provider="google"
        apiKey={GOOGLE_MAPS_API_KEY}
       showsUserLocation={true}
        showsMyLocationButton={true}
        showsScale={true}
        showsIndoorLevelPicker={true}
        zoomControlEnabled={true}
        minZoomLevel={0}
        maxZoomLevel={20}
        moveOnMarkerPress={true}
        rotateEnabled={true}
        scrollEnabled={true}
        pitchEnabled={true}
        toolbarEnabled={true}
      >
        <Marker coordinate={coords} />
      </MapView>
      ) : (
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>Location Data Not Available</Text>
        </View>
      )}
    </View>
  );
};

export default MapScreen;
