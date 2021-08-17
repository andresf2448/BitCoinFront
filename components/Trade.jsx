import React, { useState, useEffect, useContext } from "react";
import { conversorQuanti } from "../conversor/conversorQuanti";
import { conversor } from "./../conversor/conversor";
import { styles } from "../style/Trade";
import {
  View,
  Picker,
  Button,
  TextInput,
  Text,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import axios from "axios";

import { UserContext } from "../Context";

const Trade = () => {
  const context = useContext(UserContext);
  const { userid, setTransactionsH, transactionsH } = context;
  const navigation = useNavigation();
  const [selectedValue, setSelectedValue] = useState("usd");
  const [selectTrade, setselectTrade] = useState("buy");
  const [quantity, setQuantity] = useState("");
  const [infoBalances, setInfoBalances] = useState({
    usd: "",
    btc: "",
  });
  const [status, setStatus] = useState(true);
  const [totalChange, setTotalChange] = useState();

  const balances = async () => {
    let obj = {
      user_id: userid,
    };
    
    let balanceuser = await axios({
      url: "http://localhost:3000/user/balance",
      method: "Post",
      data: obj,
    });

    let balUser = balanceuser.data.response;

    setInfoBalances({
      usd: balUser.usd,
      btc: balUser.btc,
    });
  };

  useEffect(() => {
    balances();
  }, []);

  useEffect(() => {
    calculate;
  }, [quantity]);

  const calculate = async () => {
    let price = await axios("http://localhost:3000/price_bitcon/price");
    let btcprice = price.data.response;

    if (selectedValue === "btc" && quantity !== "") {
      let info = parseFloat(conversorQuanti(quantity) * btcprice);
      return setTotalChange(info);
    }
    if (selectedValue === "usd" && quantity !== "") {
      let info = parseFloat(conversorQuanti(quantity  ) / btcprice);
      return setTotalChange(info);
    }
    alert("ingrese un valor para calcular");
  };

  const send = async () => {

    if(quantity === ""){
      return alert("DEBED INGRESAR LA CANTIDAD");
    }

    var quantityTotal = conversorQuanti(quantity);
    let cReceive = "";
    if (selectTrade === "buy") {
      setStatus(!status);
      if (selectedValue === "usd") cReceive = "btc";

      if (selectedValue === "btc") cReceive = "usd";

      const obj = {
        type: "buy",
        user_id: userid,
        csend: cReceive,
        creceive: selectedValue,
        asend: parseFloat(totalChange),
        areceive: parseFloat(quantityTotal),
      };

      let data = await axios({
        url: "http://localhost:3000/transaction/buy",
        method: "Post",
        data: obj,
      });

      if (data.data.response) {
        setQuantity("");
        setTotalChange("");
        balances();
        setTransactionsH(!transactionsH)
        return alert("TRANSACCIÓN EXISTOSA");
      }
      setTotalChange("")
      return alert("FONDOS INSUFICIENTES");
    }

    if (selectTrade === "sell") {
      setStatus(!status);
      if (selectedValue === "usd") cReceive = "btc";
      if (selectedValue === "btc") cReceive = "usd";

      const obj = {
        type: "sell",
        user_id: userid,
        csend: selectedValue,
        creceive: cReceive,
        asend: parseFloat(quantityTotal),
        areceive: parseFloat(totalChange),
      };

      let data = await axios({
        url: "http://localhost:3000/transaction/buy",
        method: "Post",
        data: obj,
      });
      if (data.data.response) {
        setQuantity("");
        setTotalChange("");
        balances();
        setTransactionsH(!transactionsH)
        return alert("TRANSACCIÓN EXITOSA");
      } else {
        setTotalChange("");
        return alert("FONDOS INSUFICIENTES");
      }
    }
  };

  return (
    <View>
      <Button
        color="#0da7a3"
        title="SALIR"
        style={styles.button}
        onPress={() => navigation.navigate("Login")}
      />

      <View>
        <Text style={styles.negrita}>TU BALANCE</Text>
        <Text style={styles.negrita}>USD: {infoBalances.usd ? conversor("usd", infoBalances.usd) : null}</Text>
        <Text style={styles.negrita}>BTC: {infoBalances.btc ? conversor("btc", infoBalances.btc) : null}</Text>
      </View>

      <View>
        <View style={styles.container}>
          <Text style={styles.negrita}> TIPO DE OPERACION </Text>
          <Picker
            selectedValue={selectTrade}
            style={{ height: 50, width: 150, borderRadius:7, borderWidth:3 }}
            onValueChange={(itemValue) => setselectTrade(itemValue)}
          >
            <Picker.Item label="COMPRAR" value="buy" />
            <Picker.Item label="VENDER" value="sell" />
          </Picker>
        </View>

        <View style={styles.container}>
          {selectTrade === "buy" ? (
            <Text style={styles.negrita}> MONEDA A COMPRAR</Text>
          ) : (
            <Text style={styles.negrita}> MONEDA A VENDER </Text>
          )}

          <Picker
            selectedValue={selectedValue}
            style={{ height: 50, width: 150, borderRadius:7, borderWidth:3 }}
            onValueChange={(itemValue) => setSelectedValue(itemValue)}
          >
            <Picker.Item label="USD" value="usd" />
            <Picker.Item label="BTC" value="btc" />
          </Picker>
        </View>

        <View style={styles.container}>
          <TextInput
            placeholder="INGRESA CANTIDAD "
            style={{textAlign:'center', borderWidth : 1.0, borderRadius: 5}}
            onChangeText={setQuantity}
            value={quantity}
          />
          {selectTrade === "buy" ? (
            <Text style={styles.negrita1}> ¿CUÁNTOS {selectedValue.toUpperCase()} DESEA COMPRAR? INGRESA LA CANTIDAD EN FORMATO DE MONEDA INTERNACIONAL </Text>
          ) : (
            <Text style={styles.negrita1}> ¿CUÁNTOS {selectedValue.toUpperCase()} DESEA VENDER? INGRESA LA CANTIDAD EN FORMATO DE MONEDA INTERNACIONAL</Text>
          )}
        </View>

        <View style={styles.container}>
          {selectTrade === "buy" && <Text style={styles.negrita}> DEBES TENER . . .</Text>}

          {selectTrade === "sell" && <Text style={styles.negrita}> RECIBIRÁS </Text>}

          {totalChange ? (
            <Text>
              <Text style={styles.negrita}>{selectedValue === "usd" ? conversor("btc", totalChange) : conversor("usd", totalChange)}</Text>
              {selectedValue === "usd" ? (
                <Text style={styles.negrita}> BTC </Text>
              ) : (
                <Text style={styles.negrita}> USD </Text>
              )}
            </Text>
          ) : (
            <Text style={styles.negrita}>PRESIONA CALCULAR </Text>
          )}

          <Button color="#0da7a3" onPress={calculate} title="calcular" />
        </View>

        <Button color="#0da7a3" title={selectTrade} onPress={send} />
      </View>
    </View>
  );
};

export default Trade;