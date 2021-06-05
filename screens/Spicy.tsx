import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

import { DBFetch } from "../database/db";

const Spicy = (props: any) => {
  const [card, setCard] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      const result = await DBFetch("spicy");
      const resultArray = result?.rows?._array;
      setCard(resultArray);
    };
    fetchCards();
  }, []);

  const showCard = () => {
    return card.map((el) => (
      <View>
        <Text>{el?.title}</Text>
        <Text>{el?.description}</Text>
      </View>
    ));
  };

  return (
    <View>
      <Text>{showCard()}</Text>
    </View>
  );
};

export default Spicy;
