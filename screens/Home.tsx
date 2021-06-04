import React from "react";
import { View, Text, StyleSheet } from "react-native";

import NavigationButton from "../components/NavigationButton";

const Home = (props) => {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <NavigationButton title="Gallery" />
        <NavigationButton title="Duties" />
      </View>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <NavigationButton title="Spicy" />
        <NavigationButton title="xD" />
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
    backgroundColor: "beige",
  },
});

export default Home;
