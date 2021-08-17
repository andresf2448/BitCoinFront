import React, { useEffect, useState } from "react";
import { styles } from "./../style/DetailsId";
import { conversor } from "../conversor/conversor";
import { View, Text, ActivityIndicator, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const DetailsId = ({ route }) => {
  const navigation = useNavigation();
  const [state, setstate] = useState();

  let info = async () => {
    let obj = {
      id: route.params.id,
    };

    let transacitionId = await axios({
      url: "http://localhost:3000/transaction/Transaction",
      method: "Post",
      data: obj,
    });
    
    setstate([transacitionId.data]);
  };

  useEffect(() => {
    info();
  }, []);

  return (
    <View>
      {state ? (
        <View>
          {state.map((item, i) => {
            const {
              id,
              areceive,
              asend,
              created_at,
              creceive,
              csend,
              type_transaction,
            } = item;

            return (
              <View style={styles.info} key={i}>
                <Text style={styles.infoII}>ID TRANSATION:</Text>
                <Text style={styles.infoI}>{id}</Text>
                <Text style={styles.infoI}>FECHA DE TRANSACION:</Text>
                <Text style={styles.infoI}>{created_at.slice(0, 10)}</Text>
                <Text style={styles.infoI}>TIPO DE TRANSACION:</Text>
                <Text style={styles.infoI}>
                  {type_transaction.toUpperCase()}
                </Text>
                <Text style={styles.infoI}>MONEDA ENVIADA:</Text>
                <Text style={styles.infoI}>{csend.toUpperCase()}</Text>
                <Text style={styles.infoI}>CANTIDAD ENVIADA:</Text>
                <Text style={styles.infoI}>
                  {conversor(csend, asend)}
                </Text>
                <Text style={styles.infoI}>MONEDA RECIBIDA:</Text>
                <Text style={styles.infoI}>{creceive.toUpperCase()}</Text>
                <Text style={styles.infoI}>CANTIDAD RECIBIDA:</Text>
                <Text style={styles.infoIII}>
                  {conversor(creceive, areceive)}
                </Text>
              </View>
            );
          })}
        </View>
      ) : (
        <ActivityIndicator size="large" color="#0da7a3" />
      )}

      <Button
        color="#0da7a3"
        title="VOLVER"
        onPress={() => navigation.navigate("Home")}
      />
    </View>
  );
};

export default DetailsId;
