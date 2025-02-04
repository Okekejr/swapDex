import React, { ReactNode } from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface GradientBackgroundProps {
  children: ReactNode;
  styling?: ViewStyle;
}

const GradientBackground = ({ children, styling }: GradientBackgroundProps) => {
  return (
    <LinearGradient
      colors={["#86EDA8", "#D2F3F0", "#64CDEA"]}
      style={[styles.gradient, styling]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    overflow: "hidden",
    margin: 5,
  },
});

export default GradientBackground;
