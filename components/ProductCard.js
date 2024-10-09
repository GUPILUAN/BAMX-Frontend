import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectTheme } from "../slices/themeSlice";
import Ionicons from "react-native-vector-icons/Ionicons";
import { fetchImages } from "../functions/apiCalls";

export default function ProductCard({ item }) {
  const navigation = useNavigation();
  const theme = useSelector(selectTheme);
  const isDarkMode = theme === "dark";

  const bgColor = isDarkMode ? "bg-gray-800" : " bg-white";
  const textColor = !isDarkMode ? "text-white" : "text-gray-700";

  const [imageUri, setImageUri] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const imageUrl = await fetchImages(item.image);
        setImageUri(imageUrl);
      } catch (error) {
        console.error("Error al cargar la imagen", error);
      } finally {
        setLoading(false);
      }
    };
    fetchImage();
    return () => {
      if (imageUri) {
        URL.revokeObjectURL(imageUri);
      }
    };
  }, [item.image]);

  if (loading) {
    return (
      <View
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.3,
          shadowRadius: 7,
        }}
        className={
          "mr-8 rounded-3xl shadow-lg w-48 h-48 items-center justify-center " +
          bgColor
        }
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <View
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 7,
      }}
      className={"mr-8 rounded-3xl shadow-lg w-48 h-48 " + bgColor}
    >
      {item != null ? (
        <>
          {loading ? (
            () => <ActivityIndicator />
          ) : (
            <Image
              className="rounded-t-3xl w-full h-1/2"
              source={{
                uri: imageUri,
              }}
              resizeMode="cover"
            />
          )}
          <View className="flex-1 justify-center border-t border-gray-300">
            <View className="flex-row  justify-evenly items-end rounded-b-3xl ">
              <Text
                className={
                  "text-lg font-semibold pt-2  text-center " +
                  (!isDarkMode ? "text-black" : "text-white")
                }
              >
                {item.name}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("Details", { item })}
              >
                <Ionicons
                  name="information-circle-outline"
                  color="red"
                  size={30}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View className="flex-row w-full items-center justify-center ">
            <TouchableOpacity
              onPress={
                () => {}
                /*() => navigation.navigate("Product", { ...item })*/
              }
              className={
                "rounded-bl-3xl  bg-blue-500 w-1/2 h-8 justify-center shadow-sm shadow-gray-500"
              }
            >
              <Text className=" text-white text-center">Entregar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={
                () => {}
                /*() => navigation.navigate("Product", { ...item })*/
              }
              className={
                "rounded-br-3xl bg-amber-500 w-1/2 h-8 justify-center shadow-sm shadow-gray-500"
              }
            >
              <Text className="text-white text-center">Desechar</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : null}
    </View>
  );
}
