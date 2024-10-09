import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useEffect } from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { selectTheme } from "../slices/themeSlice";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loadSettings } from "../slices/settingsSlice";
import { useDrawerStatus } from "@react-navigation/drawer";

export default function SideBar() {
  const navigation = useNavigation();
  const isIOS = Platform.OS === "ios";
  const isWeb = Platform.OS === "web";
  const { width, height } = Dimensions.get("window"); // Obtén las dimensiones de la pantalla
  const theme = useSelector(selectTheme);
  const isDark = theme === "dark";
  const isDrawerOpen = useDrawerStatus() === "open";

  const themeColorsTailwind = {
    backgroundTailwind: isDark ? "bg-gray-900" : "bg-gray-50",
    textTailwind: isDark ? "text-gray-300" : "text-gray-900",
  };
  const dispatch = useDispatch();

  useEffect(() => {
    const loadStoredSettings = async () => {
      try {
        const savedSettings = await AsyncStorage.getItem("userSettings");
        if (savedSettings !== null) {
          const parsedSettings = JSON.parse(savedSettings);
          dispatch(loadSettings(parsedSettings));
        }
      } catch (e) {
        console.error("Error loading settings:", e);
      }
    };

    loadStoredSettings();
  }, [dispatch]);

  return (
    <SafeAreaView
      className={"flex-1 w-full h-full border-gray-400 border-r"}
      style={styles.sideBarBackground(isDark)}
    >
      <View className={"flex-1 h-full pb-3"}>
        <TouchableOpacity
          className="justify-center items-end p-4"
          style={{
            position: "absolute",
            top: height * 0.03,
            right: -(width * 0.045),
            width: width * 0.12,
            height: width * 0.05,
            backgroundColor: "#e1a244",
            borderRadius: 25,
            elevation: 5,
          }}
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        >
          <Ionicons
            name={isDrawerOpen ? "arrow-back" : "arrow-forward"}
            size={28}
            color={isDark ? "#1a1a1a" : "#ece7dc"}
          />
        </TouchableOpacity>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false}>
          <View
            className={
              "flex-1 w-full h-full " +
              (isIOS ? "" : " border-gray-400 border-r")
            }
            style={styles.sideBarBackground(isDark)}
          >
            <View className=" items-center justify-center border-b border-gray-300 px-3">
              <Image
                className="w-full h-24 m-3"
                source={{
                  uri: "https://bamx.org.mx/wp-content/uploads/2023/10/RED-BAMX.png",
                }}
                resizeMode="contain"
              />
            </View>

            <View className="flex-col items-start justify-center  p-4">
              <TouchableOpacity
                className="pl-4 py-2 flex-row items-center"
                onPress={() => navigation.navigate("Inicio")}
              >
                <Icon name="home" size={30} color="#e1a244" />
                <Text
                  className={"ml-2 font-extrabold text-lg"}
                  style={styles.menuText}
                >
                  Inicio
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="pl-4 py-2 flex-row items-center">
                <Icon name="cube" size={30} color="#e1a244" />
                <Text
                  className={"ml-2 font-extrabold text-lg"}
                  style={styles.menuText}
                >
                  Inventario
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="pl-4 py-2 flex-row items-center">
                <Icon name="book" size={30} color="#e1a244" />
                <Text
                  className={"ml-2 font-extrabold text-lg"}
                  style={styles.menuText}
                >
                  Catálogo
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="pl-4 py-2 flex-row items-center">
                <Icon name="edit" size={30} color="#e1a244" />
                <Text
                  className={"ml-2 font-extrabold text-lg"}
                  style={styles.menuText}
                >
                  Registro
                </Text>
              </TouchableOpacity>
            </View>
            <View className="flex-col items-center justify-center border-b border-t border-gray-300 m-2">
              <TouchableOpacity
                className="flex-row items-center justify-center m-4 rounded-2xl"
                style={styles.button(true, width, height)}
              >
                <View className="flex-row items-center p-6">
                  <Icon
                    name="cart-plus"
                    size={30}
                    color={isDark ? "#1a1a1a" : "#ece7dc"}
                  />
                  <Text
                    className="ml-2 font-extrabold text-lg text-center"
                    style={styles.cartText(isDark)}
                  >
                    Productos{"\n"}entregables
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-row items-center justify-center m-4 rounded-2xl"
                style={styles.button(false, width, height)}
              >
                <View className="flex-row items-center p-6">
                  <Icon
                    name="cart-arrow-down"
                    size={30}
                    color={isDark ? "#1a1a1a" : "#ece7dc"}
                  />
                  <Text
                    className="ml-2 font-extrabold text-lg text-center"
                    style={styles.cartText(isDark)}
                  >
                    Productos no{"\n"}aptos
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <View
              className={
                "flex-row items-center justify-between px-5 pt-10 " +
                (!isWeb ? "absolute w-full bottom-0" : "")
              }
            >
              <TouchableOpacity className="flex-row items-center">
                <Image
                  source={{
                    uri: "https://bamx.org.mx/wp-content/uploads/2023/10/RED-BAMX.png",
                  }}
                  style={{ width: 50, height: 50, borderRadius: 20 }}
                />
                <Text
                  className={`${themeColorsTailwind.textTailwind} ml-2 text-lg`}
                >
                  Usuario
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-row items-center"
                onPress={() => navigation.navigate("Configuracion")}
              >
                <Ionicons name="settings-outline" size={40} color="#e1a244" />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  menuText: {
    color: "#e1a244",
    fontFamily: "SF-Pro-Bold",
    fontSize: Dimensions.get("window").width * 0.013,
  },
  sideBarBackground: (isDark) => ({
    backgroundColor: isDark ? "#100e09" : "#ece7dc",
  }),
  cartText: (isDark) => ({
    color: isDark ? "#1a1a1a" : "#ece7dc",
    fontFamily: "SF-Pro-Semibold",
    fontSize: Dimensions.get("window").width * 0.013,
  }),
  button: (good, width, height) => ({
    backgroundColor: good ? "#78af6d" : "#d65f61",
    width: width * 0.15,
    height: height * 0.15,
    padding: 1,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  }),
});
