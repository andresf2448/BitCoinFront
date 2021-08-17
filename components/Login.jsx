import React, { useContext, useState } from "react";
import { styles } from "./../style/Login";
import {
  TouchableOpacity,
  Text,
  View,
  TextInput,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { UserContext } from "../Context";

const Login = () => {
  const context = useContext(UserContext);
  const { setUserid } = context;
  const navigation = useNavigation();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const handleSumit = async () => {
    let response = await axios.post("http://localhost:3000/user/login", {
      username: user,
      password: password,
    });

    response = response.data.response;

    if (user !== "" && password !== "") {
      if (response === "clave inválida") return alert("CLAVE INVALIDA");
      if (response === "usuario no existe") return alert("USUARIO NO EXISTE");
      if (typeof response === "number") {
        setUserid(response);
        setUser("");
        setPassword("");
        return navigation.navigate("Home", { data: response });
      }
    }

    alert("COMPLETE LOS CAMPOS");
  };
  return (
    <View>
      <Image
        style={styles.tinyLogo}
        source={{
          uri: "https://vitawallet.io/assets/vita_quote_logo_footer.png",
        }}
      />

      <View style={styles.container}>
        <TextInput
          style={styles.inputs}
          placeholder="USUARIO"
          value={user}
          onChangeText={setUser}
        />

        <TextInput
          secureTextEntry={true}
          style={styles.inputs}
          placeholder="CONTRASEÑA"
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <TouchableOpacity onPress={handleSumit} style={styles.button}>
        <Text style={styles.texto}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;