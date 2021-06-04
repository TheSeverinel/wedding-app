import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const NavigationButton = (props) => {
  const { title } = props; //image //destination

  const onPress = () => {};

  return (
    <TouchableOpacity onPress={onPress} style={styles.background}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'blue'
  },
  text: {
    fontFamily: 'open-sans',
    fontSize: 16
  }
})

export default NavigationButton;
