import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import {
  FontAwesome6,
  MaterialCommunityIcons,
  Feather,
} from "react-native-vector-icons/";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectTheme } from "../slices/themeSlice";

export default function SearchHeader({ onDataChange }) {
  const [selecting, setSelecting] = useState(false);
  const [filterSelected, setFilterSelected] = useState("ingreso");
  const [search, setSearch] = useState("");
  const [orderType, setOrderType] = useState(false);
  const navigation = useNavigation();
  const theme = useSelector(selectTheme);
  const isDarkMode = theme === "dark";
  const textColor = isDarkMode ? "text-gray-800" : "text-white";
  const order = orderType ? "ascendente" : "descendente";

  const handleFilterSelection = (filter) => {
    setFilterSelected(filter);
  };
  const handleFilterOrder = (order) => {
    setOrderType(order);
  };

  const handleClick = () => {
    const newData = [];
    onDataChange(newData);
  };

  return (
    <View className="flex-row mt-2 justify-between">
      <View className="flex-col w-1/2 mr-16">
        {/*SearchBar*/}
        <View className="flex-row items-center mb-2">
          <View
            className={"flex-row items-center p-3 rounded-lg  bg-gray-300 "}
          >
            <Feather
              name="search"
              size={20}
              color={isDarkMode ? "white" : "gray"}
            />
            <TextInput
              placeholder="Buscar productos..."
              placeholderTextColor="gray"
              className={"ml-2 flex-1 "}
            />
          </View>
        </View>
        {/*Buttons*/}
        <TouchableOpacity className="w-11/12 self-center p-1 rounded-xl  bg-blue-800 mb-2">
          <View className="flex-row items-center ">
            <MaterialCommunityIcons name="plus-box" size={25} color="white" />
            <Text className={"text-white text-center font-bold text-lg pl-4"}>
              Añadir productos al inventario
            </Text>
          </View>
        </TouchableOpacity>

        <View className="flex-row  justify-evenly w-11/12 self-center">
          <TouchableOpacity
            className={
              "rounded-l-xl w-1/2 p-1 border-gray-400 border " +
              (filterSelected === "ingreso" ? "bg-gray-300" : "bg-white")
            }
            onPress={() => handleFilterSelection("ingreso")}
          >
            <Text className="text-center">Ordenar por fecha de ingreso</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={
              "rounded-r-xl w-1/2 p-1 border-gray-400 border " +
              (filterSelected !== "ingreso" ? "bg-gray-300" : "bg-white")
            }
            onPress={() => handleFilterSelection("caducidad")}
          >
            <Text className="text-center">Ordenar por fecha de caducidad</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="flex-col h-3/5">
        <View className="flex-row">
          <TouchableOpacity
            className="flex-col bg-gray-400 justify-center rounded-3xl mx-2"
            onPress={handleClick}
          >
            <View className="items-center p-5">
              <FontAwesome6
                name="basket-shopping"
                size={30}
                color={isDarkMode ? "white" : "white"}
              />
              <Text className={"mt-1 text-center " + textColor}>
                Agregar para {"\n"}entrega
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-col bg-gray-400 justify-center rounded-3xl mx-2"
            onPress={handleClick}
          >
            <View className="items-center p-5">
              <FontAwesome6
                name="trash"
                size={30}
                color={isDarkMode ? "white" : "white"}
              />
              <Text className={"mt-1 text-center " + textColor}>
                Agregar para {"\n"}deshecho
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center justify-evenly mt-1">
          <Text className="text-center text-base font-light">
            Orden {order}
          </Text>
          <TouchableOpacity
            onPress={() => handleFilterOrder((prevState) => !prevState)}
          >
            <MaterialCommunityIcons
              name={
                orderType
                  ? "sort-calendar-descending"
                  : "sort-calendar-ascending"
              }
              size={30}
              color={"#1b4671"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
