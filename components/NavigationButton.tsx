import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

import colors from '../constants/colors';

interface Props {
  title: string,
  onPress: Function
}

const NavigationButton = (props: Props) => {
  const { title, onPress } = props; //image //destination


  return (
    <TouchableOpacity onPress={() => onPress(title)} style={styles.background}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.accent,
    borderWidth: 2,
    borderColor: colors.primary
  },
  text: {
    fontFamily: 'open-sans',
    fontSize: 30,
    height: '100%',
    width: '100%',
    textAlign: 'center',
    textAlignVertical: 'center'
  }
})

export default NavigationButton;
