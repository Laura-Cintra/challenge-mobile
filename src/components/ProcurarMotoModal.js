import { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Client, Message } from "paho-mqtt";
import ListaMotos from "./ListaMotos";
import { getMotos, getPatioById } from "../services/actions";
import { useUser } from "../providers/UserContext";
import { useTheme } from "../providers/ThemeContext";
import MessageModal from "./MessageModal";

export default function ProcurarMotoModal({ visible, onClose }) {
  const { user } = useUser();
  const { colors } = useTheme();

  const [busca, setBusca] = useState("");
  const [selected, setSelected] = useState(null);
  const [motos, setMotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erroMsg, setErroMsg] = useState("");

  const [mqttClient, setMqttClient] = useState(null);
  const [connected, setConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const [messageModalVisible, setMessageModalVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);

  useEffect(() => {
    if (visible) {
      carregarMotos();
      conectarMqtt();
    } else {
      setMotos([]);
      setBusca("");
      setSelected(null);
      setErroMsg("");
      if (mqttClient && mqttClient.isConnected()) {
        mqttClient.disconnect();
      }
    }
  }, [visible, user]);

  const conectarMqtt = () => {
    setIsConnecting(true);
    const clientId = "SmartPatio_" + Math.random().toString(16).substr(2, 8);
    const client = new Client("broker.hivemq.com", 8000, "/mqtt", clientId);

    client.onConnectionLost = (responseObject) => {
      if (responseObject.errorCode !== 0) {
        setConnected(false);
      }
      setIsConnecting(false);
    };

    client.onMessageArrived = (message) => {
      console.log(
        "MQTT message:",
        message.destinationName,
        message.payloadString
      );
    };

    client.connect({
      onSuccess: () => {
        console.log("MQTT conectado!");
        setConnected(true);
        setIsConnecting(false);
        client.subscribe("smartpatio/status");
      },
      onFailure: (err) => {
        console.error("Falha na conexão MQTT:", err.errorMessage);
        setConnected(false);
        setIsConnecting(false);
      },
      timeout: 10,
      keepAliveInterval: 30,
      cleanSession: true,
      useSSL: false,
    });

    setMqttClient(client);
  };

  const carregarMotos = async () => {
    setLoading(true);
    setErroMsg("");
    try {
      if (user?.idPatio) {
        const patio = await getPatioById(user.idPatio);
        const motosDoPatio = patio?.motos ?? [];
        setMotos(motosDoPatio);
        if ((motosDoPatio?.length ?? 0) === 0) {
          setErroMsg("Nenhuma moto cadastrada neste pátio.");
        }
        return;
      }
      const todas = await getMotos();

      let motosDoPatio = [];
      if (user?.idPatio) {
        motosDoPatio = todas.filter((m) => m.idPatio === user.idPatio);
      }

      if ((motosDoPatio?.length ?? 0) === 0 && user?.nomePatio) {
        motosDoPatio = todas.filter(
          (m) =>
            (m.nomePatio ?? "").toLowerCase() ===
            String(user.nomePatio).toLowerCase()
        );
      }

      if ((motosDoPatio?.length ?? 0) === 0) {
        setErroMsg("Nenhuma moto encontrada para o seu pátio.");
      }

      setMotos(motosDoPatio);
    } catch (err) {
      console.error("Erro ao carregar motos do pátio:", err);
      setErroMsg("Erro ao carregar motos. Verifique a conexão.");
    } finally {
      setLoading(false);
    }
  };

  const localizar = (moto) => {
    if (isConnecting || !mqttClient || !connected) {
      setMessage("MQTT não conectado");
      setIsSuccess(false);
      setMessageModalVisible(true);
      return;
    }
    const command = `ACTIVATE`;

    const message = new Message(command);
    message.destinationName = `smartpatio/commands/${moto.idCarrapato}`;
    mqttClient.send(message);
    setSelected(moto.placa ?? moto.chassi ?? moto.id?.toString());

    setMessage(`Localizando moto ${moto.placa}`);
    setIsSuccess(true);
    setMessageModalVisible(true);
  };

  const parar = (moto) => {
    if (isConnecting || !mqttClient || !connected) {
      setMessage("MQTT não conectado");
      setIsSuccess(false);
      setMessageModalVisible(true);
      return;
    }
    const command = `DEACTIVATE`;
    const message = new Message(command);
    message.destinationName = `smartpatio/commands/${moto.idCarrapato}`;

    mqttClient.send(message);
    setSelected(null);

    setMessage(`Parando localização da moto ${moto.placa}`);
    setIsSuccess(false);
    setMessageModalVisible(true);
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={[styles.statusBox, { backgroundColor: colors.white }]}>
          <Text
            style={{ color: connected ? "green" : "red", fontWeight: "bold" }}
          >
            MQTT:{" "}
            {connected
              ? "Conectado"
              : isConnecting
              ? "Conectando..."
              : "Desconectado"}
          </Text>
        </View>

        {loading ? (
          <ActivityIndicator
            size="large"
            color={colors.primary}
            style={{ marginTop: 50 }}
          />
        ) : (
          <>
            {erroMsg ? (
              <View style={{ padding: 20, alignItems: "center" }}>
                <Text style={{ color: colors.text, fontSize: 16 }}>
                  {erroMsg}
                </Text>
              </View>
            ) : (
              <ListaMotos
                titulo="Localize uma moto em seu pátio"
                motos={motos}
                busca={busca}
                setBusca={setBusca}
                selected={selected}
                onLocalizar={localizar}
                onParar={parar}
                mostrarFiltro={true}
                permitirLocalizar={true}
              />
            )}
          </>
        )}

        <TouchableOpacity
          style={[styles.closeButton, { backgroundColor: colors.primary }]}
          onPress={onClose}
        >
          <MaterialCommunityIcons name="close" size={20} color="#FBFBFB" />
          <Text style={{ color: "#FBFBFB", fontSize: 16, marginLeft: 6 }}>
            Fechar
          </Text>
        </TouchableOpacity>

        <MessageModal
          visible={messageModalVisible}
          message={message}
          isSuccess={isSuccess}
          onClose={() => setMessageModalVisible(false)}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  closeButton: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    borderRadius: 10,
  },
  statusBox: {
    alignItems: "center",
    marginBottom: 10,
    padding: 8,
    borderRadius: 6,
  },
});