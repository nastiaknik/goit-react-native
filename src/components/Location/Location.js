import { useState, useEffect } from "react";
import * as Location from "expo-location";
import axios from "axios";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { View, Alert, Linking } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import Constants from "expo-constants";
const { GOOGLE_MAPS_API_KEY } = Constants.manifest.extra;
import styles from "./LocationStyles";

const LocationComponent = ({
  setLocation,
  locationDescription,
  setLocationDescription,
}) => {
  const [locationPermission, setLocationPermission] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      await getCurrentLocation();
    };
    fetchData();
  }, []);

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === "granted") {
          setLocationPermission(true);
          getCurrentLocation();
        } else {
          setLocationPermission(false);
          Alert.alert(
            "Location Access Required",
            "To use map feature, we need access to your location. Please grant location access in the app settings.",
            [
              {
                text: "Cancel",
                style: "cancel",
              },
              {
                text: "Open Settings",
                onPress: () => {
                  if (Platform.OS === "android") {
                    try {
                      Linking.openSettings();
                    } catch (error) {
                      Alert.alert("Error opening app settings:", error);
                    }
                  } else if (Platform.OS === "ios") {
                    try {
                      Linking.openURL("app-settings:");
                    } catch (error) {
                      console.warn("Error opening app settings:", error);
                    }
                  }
                },
              },
            ]
          );
        }
      } catch (error) {
        console.warn("Error while requesting location permission:", error);
      }
    };
    requestLocationPermission();
  }, [locationPermission]);

  const getCurrentLocation = async () => {
    try {
      const { coords } = await Location.getCurrentPositionAsync();
      setLocation(coords);

      const { city, country } = await getLocationDescription(coords);
      setLocationDescription(`${city}, ${country}`);
    } catch (error) {
      return Alert.alert(
        "Location Access Required",
        "We need your permission to access your location. Please enable location services in your device settings to use the map feature."
      );
    }
  };

  const getLocationDescription = async ({ latitude, longitude }) => {
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`;
    try {
      const response = await axios.get(apiUrl);
      if (response.data.results.length > 0) {
        const address = response.data.results[0].address_components;
        let city = "";
        let country = "";
        address.forEach((component) => {
          if (
            component.types.some((type) =>
              [
                "locality",
                "administrative_area_level_3",
                "postal_town",
              ].includes(type)
            )
          ) {
            city = component.long_name;
          }
          if (component.types.includes("country")) {
            country = component.long_name;
          }
        });
        return { city, country };
      } else {
        return;
      }
    } catch (error) {
      console.error("Error fetching location:", error);
      return;
    }
  };

  const handleLocationDescr = (location) => {
    return location.length > 39 ? `${location.slice(0, 38)}...` : location;
  };

  return (
    <View style={styles.locationWrapper}>
      <SimpleLineIcons name="location-pin" size={18} color="#E8E8E8" />
      <GooglePlacesAutocomplete
        placeholder="Місцевість..."
        placeholderTextColor="#BDBDBD"
        textInputProps={{
          value: locationDescription,
          onChangeText: (text) => setLocationDescription(text),
        }}
        onPress={(data, details = null) => {
          setLocationDescription(data.description);
          setLocation({
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
          });
        }}
        query={{
          key: GOOGLE_MAPS_API_KEY,
          language: ["uk", "en"],
        }}
        fetchDetails={true}
        listViewDisplayed="auto"
        listUnderlayColor="transparent"
        renderDescription={(rowData) =>
          handleLocationDescr(rowData.description)
        }
        styles={{
          textInput: styles.location,
          listView: styles.list,
          row: {
            padding: 10,
            height: 44,
          },
          separator: {
            backgroundColor: "#E8E8E8",
          },
        }}
      />
    </View>
  );
};

export default LocationComponent;
