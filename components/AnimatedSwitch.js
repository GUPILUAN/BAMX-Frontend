import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { useSelector } from "react-redux";
import { selectTheme } from "../slices/themeSlice";

export default function AnimatedSwitch({ onValueChange }) {
  const [active, setActive] = useState("Semaforo");
  const [animatedValue] = useState(new Animated.Value(0));
  const theme = useSelector(selectTheme);
  const isDark = theme === "dark";

  const handlePress = (button) => {
    setActive(button);
    onValueChange(button);
    Animated.timing(animatedValue, {
      toValue: button === "Semaforo" ? 0 : 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const interpolatedLeft = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "50%"],
  });

  return (
    <View className={"items-center justify-start "}>
      <View style={styles.switchContainer(isDark)}>
        <Animated.View
          style={[styles.animatedBg, { left: interpolatedLeft }]}
        />
        <TouchableOpacity
          style={[styles.button, active === "Semaforo" && styles.activeButton]}
          onPress={() => handlePress("Semaforo")}
        >
          <Text
            style={[
              styles.text,
              active === "Semaforo" ? styles.activeText : styles.inactiveText,
            ]}
          >
            Semáforo
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            active === "Refrigeradores" && styles.activeButton,
          ]}
          onPress={() => handlePress("Refrigeradores")}
        >
          <Text
            style={[
              styles.text,
              active === "Refrigeradores"
                ? styles.activeText
                : styles.inactiveText,
            ]}
          >
            Refrigeradores
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  switchContainer: (isDark) => ({
    flexDirection: "row",
    backgroundColor: isDark ? "#362e1d" : "#fff",
    borderRadius: 25,
    position: "",
    width: 400,
    height: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  }),
  animatedBg: {
    position: "absolute",
    width: "50%",
    height: "100%",
    backgroundColor: "#fbe8c4",
    borderRadius: 25,
    zIndex: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
  activeButton: {},
  activeText: {
    color: "#4A90E2",
  },
  inactiveText: {
    color: "#F5A623",
  },
});
