import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
} from "react-native";
import { useSelector } from "react-redux";
import { selectTheme } from "../slices/themeSlice";
import ProductCard from "./ProductCard";
import Ionicons from "react-native-vector-icons/Ionicons";
import { retrieveData } from "../functions/apiCalls";

export default function FeaturedRow({ status }) {
  const theme = useSelector(selectTheme);
  const isDark = theme === "dark";
  const [products, setProducts] = useState({});

  const isWeb = Platform.OS === "web";
  const iconColor = (category) =>
    category === "critic"
      ? "#FF4D4F"
      : category === "warning"
      ? "#FFC107"
      : "#52C41A";
  const iconName = (category) =>
    category === "critic"
      ? "warning"
      : category === "warning"
      ? "alert-circle"
      : "checkmark-circle";

  useEffect(() => {
    const fetchProducts = async () => {
      const productsF = await retrieveData("/api/products/");
      setProducts(productsF);
    };
    fetchProducts();
  }, []);

  return (
    <View
      className={`flex-row max-w-6xl mb-5 ${isWeb ? "overflow-scroll" : ""}`}
    >
      <View className="flex-col">
        <View className="flex-row justify-start items-center">
          <Text style={styles.titleText(status.category)}>{status.title}</Text>
          <Ionicons
            name={iconName(status.category)}
            size={Dimensions.get("window").width * 0.035}
            color={iconColor(status.category)}
          />
        </View>
        <FlatList
          data={products}
          nestedScrollEnabled={true}
          renderItem={({ item }) => <ProductCard item={item} />}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          style={{ paddingVertical: 18 }}
          horizontal
          ListFooterComponent={
            <TouchableOpacity className="items-center justify-center p-3">
              <View className="justify-center items-center items-col">
                <View
                  className={
                    "border-2 rounded-lg my-5 " +
                    (isDark ? "border-white" : "border-black")
                  }
                >
                  <Ionicons
                    name="arrow-forward"
                    size={70}
                    color={isDark ? "white" : "black"}
                  ></Ionicons>
                </View>
                <Text
                  className={
                    "text-2xl font-bold " +
                    (isDark ? "text-white" : "text-black")
                  }
                >
                  Ver más
                </Text>
              </View>
            </TouchableOpacity>
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleText: (category) => ({
    color:
      category === "critic"
        ? "#FF4D4F"
        : category === "warning"
        ? "#FFC107"
        : "#52C41A",
    fontFamily: "SF-Compact-Semibold",
    fontSize: Dimensions.get("window").width * 0.035,
    marginRight: 5,
  }),
});
