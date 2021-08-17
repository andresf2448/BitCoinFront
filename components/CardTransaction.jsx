import React from "react";
import { styles } from "./../style/CardTransaction";
import { TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

const CardTransaction = ({ updated_at, type_transaction, creceive, id }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("Details", { id })}
    >
      <Text style={styles.label}>{updated_at.slice(0, 10)}</Text>
      <Text style={styles.labels}>{" "}{type_transaction.toUpperCase()} </Text>
      <Text style={styles.labels}>{creceive.toUpperCase()} </Text>
    </TouchableOpacity>
  );
};

export default CardTransaction;