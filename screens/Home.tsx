import React from "react";
import { View, Text, StyleSheet } from "react-native";

import colors from '../constants/colors';
import NavigationButton from "../components/NavigationButton";

const Home = (props: any) => {
  const {
    navigation: { navigate },
  } = props;

  const navigateTo = (screen: Required<string>) => {
    navigate(screen);
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <NavigationButton title="Gallery" onPress={navigateTo} />
        <NavigationButton title="Duties" onPress={navigateTo} />
      </View>
      <View style={styles.row}>
        <NavigationButton title="Spicy" onPress={navigateTo} />
        <NavigationButton title="Surprise" onPress={navigateTo} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    flexDirection: "column",
    flexWrap: "wrap",
    backgroundColor: colors.primary,
  },
  row: {
    flex: 1,
    flexDirection: "row"
  }
});

export default Home;
