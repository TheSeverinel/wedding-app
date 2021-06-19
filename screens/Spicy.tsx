import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";

import { DBGetOne, DBDelete } from "../database/db";

import colors from "../constants/colors";

interface Props {}

const Spicy = (props: Props) => {
  const [card, setCard] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      const result: any = await DBGetOne("spicy");
      const cardObject = result?.rows?._array?.[0];
      if (cardObject) {
        setCard(cardObject);
      }
    };
    fetchCards();
  }, []);

  const showCard = () => {
    const { id, title, description }: any = card;
    if (id) {
      return (
        <View key={id}>
          <ImageBackground source={require('../assets/images/img-0.jpg')} style={styles.background}>
            <Text>{title}</Text>
            <Text>{description}</Text>
          </ImageBackground>
        </View>
      );
    }
    return null;
  };

  return <View style={styles.container}>{showCard()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    flexDirection: "column",
    flexWrap: "wrap",
    // backgroundColor: colors.accent,
  },
  background: {
    width: '100%',
    height: '100%',
    resizeMode: "cover",
  },
  row: {
    flex: 1,
    flexDirection: "row",
  },
});

export default Spicy;
