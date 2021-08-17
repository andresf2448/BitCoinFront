import React, { useState, useEffect } from "react";
import { styles } from "./../style/Dashboard";
import { conversor } from "../conversor/conversor";
import {
  View,
  Text,
  ActivityIndicator,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const Dashboard = () => {
  const [state, setstate] = useState(false);
  const navigation = useNavigation();

  const api = async () => {
    let price = await axios.get("http://localhost:3000/price_bitcon/price");
    let priceApi = price.data.response;
    price = conversor("usd", priceApi);
    setstate(price);
  };

  useEffect(() => {
    var time = setInterval(api, 5000);
      return () => {
        clearTimeout(time)
      }
  },[])

  return (
    <View>
      <Button
        color="#0da7a3"
        title="Exit"
        onPress={() => navigation.navigate("Login")}
      />

      <View style={styles.info}>
        <Text style={styles.texto}>PRECIO BTC EN USD</Text>
        {!state ? (
          <ActivityIndicator size="large" color="#0da7a3" />
        ) : (
          <Text style={styles.texto}>{state}</Text>
        )}
      </View>
    </View>
  );
};

export default Dashboard;