import React, { FC } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface SortButtonProps {
  title: string;
  isSelected: boolean;
  onPress: () => void;
}

const SortButton: FC<SortButtonProps> = ({ title, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.button, isSelected && styles.selectedButton]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, isSelected && styles.selectedText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#151515",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    flex: 1,
  },
  buttonText: {
    color: "#c7c7c7",
  },
  selectedButton: {
    backgroundColor: "#0F1914",
    borderWidth: 1,
    borderColor: "#1D6C41",
    color: "#24f07d",
  },
  selectedText: {
    color: "#24f07d",
  },
});

export default SortButton;
