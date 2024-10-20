import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  Platform,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Text,
} from "react-native";
import { FontAwesome6 } from "react-native-vector-icons/";
import { selectTheme } from "../slices/themeSlice";
import { useSelector } from "react-redux";
import SearchHeader from "../components/SearchHeader";
import ProductList from "../components/ProductList";
import { TouchableOpacity } from "react-native";
import { productosDummy } from "../constants/Products";

export default function InventoryScreen() {
  const theme = useSelector(selectTheme);
  const isDark = theme === "dark";
  const isWeb = Platform.OS === "web";
  const themeColorsTailwind = {
    backgroundTailwind: isDark ? "bg-gray-900" : "bg-gray-50",
    textTailwind: isDark ? "text-gray-300" : "text-gray-900",
  };
  const numbers = [];
  const paquetes = productosDummy.results.length / 8;
  for (let i = 0; i < paquetes; i++) {
    numbers.push(i + 1);
  }

  const [inicio, setInicio] = useState(0);
  const [limite, setLimite] = useState(5);
  const [data, setData] = useState(
    numbers.length >= 5 ? numbers.slice(inicio, limite) : numbers
  );

  const loadMore = () => {
    if (numbers.length >= limite) {
      setInicio((prev) => prev + 5);
      setLimite((prev) => prev + 5);
    }
  };

  const loadLess = () => {
    setInicio((prev) => prev - 5);
    setLimite((prev) => prev - 5);
  };

  useEffect(() => {
    if (inicio < 0) {
      setInicio(0);
      setLimite(5);
    } else if (inicio >= numbers.length) {
      setData(numbers.slice(limite));
    } else {
      setData(numbers.slice(inicio, limite));
    }
  }, [inicio, limite]);

  const showData = () => {};
  const [tt, setTT] = useState([]);
  const handleButtons = (newData) => {
    setTT(newData);
  };

  const [indexes, setIndexes] = useState([]);
  const handleAction = (newData) => {
    setIndexes(newData);
  };

  if (productosDummy.results.length === 0) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-2xl text-gray-500">No hay productos</Text>
      </View>
    );
  }
  console.log(indexes);

  return (
    <SafeAreaView
      className={`${themeColorsTailwind.backgroundTailwind} w-full h-full b flex-1 `}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback
          onPress={() => Platform.OS !== "web" && Keyboard.dismiss()}
        >
          <View
            className={`${
              themeColorsTailwind.backgroundTailwind
            } w-full h-full  b flex-1 ${isWeb ? "overflow-scroll" : ""}`}
          >
            <View className="flex-col">
              <View className="items-center">
                <SearchHeader onDataChange={handleButtons} />
                <ProductList
                  productos={productosDummy.results}
                  test={tt}
                  getIndexes={handleAction}
                />

                <View className="mt-5 flex-row items-center ">
                  <TouchableOpacity
                    className="rounded-md border-2 border-red-500 p-2"
                    onPress={loadLess}
                  >
                    <FontAwesome6 name="arrow-left" size={20} color="red" />
                  </TouchableOpacity>

                  {data.map((val, index) => {
                    return (
                      <TouchableOpacity key={index}>
                        <Text className="mx-2 text-xl text-gray-500">
                          {val}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                  {limite < numbers.length && (
                    <Text className="mx-2 text-xl text-gray-500">...</Text>
                  )}
                  <TouchableOpacity
                    className="rounded-lg border-2 border-red-500 p-2"
                    onPress={loadMore}
                  >
                    <FontAwesome6 name="arrow-right" size={20} color="red" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
