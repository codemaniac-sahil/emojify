import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

function Button({ label, theme, onPress }) {
  if (theme === "primary") {
    return (
      <View style={[styles.buttonContainer, { borderRadius: 18 }]}>
        <Pressable
          style={[styles.button, { backgroundColor: "#f9f9" }]}
          onPress={onPress}
        >
          <FontAwesome
            name="picture-o"
            size={18}
            color="#f9f9f9"
            style={styles.buttonIcon}
          />
          <Text style={[styles.buttonLabel, { color: "#f9f9f9" }]}>
            {label}
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.buttonContainer}>
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    borderRadius: 10,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    color: "#f9f9f9",
    fontSize: 16,
  },
});

export default Button;
