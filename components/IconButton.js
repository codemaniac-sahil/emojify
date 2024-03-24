import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

function IconButton({ icon, label, onPress }) {
  return (
    <Pressable style={styles.iconButton} onPress={onPress}>
      <MaterialIcons name={icon} size={24} color="#f9f9f9" />
      <Text style={styles.iconLabel}>{label} </Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  iconButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconLabel: {
    color: "#f9f9f9",
    marginTop: 12,
  },
});

export default IconButton;
