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
import { useTranslation } from "react-i18next";

export default function ProcurarMotoModal({ visible, onClose }) {
  const { user } = useUser();
  const { colors } = useTheme();
  const { t } = useTranslation();

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
      if (mqttClient && mqttClient.isConnected()) mqttClient.disconnect();
    }
  }, [visible, user]);

  const conectarMqtt = () => {
    setIsConnecting(true);
    const clientId = "SmartPatio_" + Math.random().toString(16).substr(2, 8);
    const client = new Client("broker.hivemq.com", 8000, "/mqtt", clientId);

    client.onConnectionLost = (responseObject) => {
      if (responseObject.errorCode !== 0) setConnected(false);
      setIsConnecting(false);
    };

    client.connect({
      onSuccess: () => {
        setConnected(true);
        setIsConnecting(false);
        client.subscribe("smartpatio/status");
      },
      onFailure: () => {
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
        if (motosDoPatio.length === 0) setErroMsg(t("searchMotorcycle.errorNoMotorcycle"));
        return;
      }
      const todas = await getMotos();
      let motosDoPatio = todas.filter((m) => m.idPatio === user?.idPatio);
      if (motosDoPatio.length === 0 && user?.nomePatio) {
        motosDoPatio = todas.filter(
          (m) => (m.nomePatio ?? "").toLowerCase() === user.nomePatio.toLowerCase()
        );
      }
      if (motosDoPatio.length === 0) setErroMsg(t("searchMotorcycle.errorNotFound"));
      setMotos(motosDoPatio);
    } catch {
      setErroMsg(t("searchMotorcycle.errorLoad"));
    } finally {
      setLoading(false);
    }
  };

  const localizar = (moto) => {
    if (isConnecting || !mqttClient || !connected) {
      setMessage(t("searchMotorcycle.mqttNotConnected"));
      setIsSuccess(false);
      setMessageModalVisible(true);
      return;
    }
    const msg = new Message("ACTIVATE");
    msg.destinationName = `smartpatio/commands/${moto.idCarrapato}`;
    mqttClient.send(msg);
    setSelected(moto.placa);
    setMessage(t("searchMotorcycle.locating", { placa: moto.placa }));
    setIsSuccess(true);
    setMessageModalVisible(true);
  };

  const parar = (moto) => {
    if (isConnecting || !mqttClient || !connected) {
      setMessage(t("searchMotorcycle.mqttNotConnected"));
      setIsSuccess(false);
      setMessageModalVisible(true);
      return;
    }
    const msg = new Message("DEACTIVATE");
    msg.destinationName = `smartpatio/commands/${moto.idCarrapato}`;
    mqttClient.send(msg);
    setSelected(null);
    setMessage(t("searchMotorcycle.stopping", { placa: moto.placa }));
    setIsSuccess(false);
    setMessageModalVisible(true);
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={[styles.statusBox, { backgroundColor: colors.white }]}>
          <Text style={{ color: connected ? "green" : "red", fontWeight: "bold" }}>
            MQTT:{" "}
            {connected
              ? t("searchMotorcycle.status.connected")
              : isConnecting
              ? t("searchMotorcycle.status.connecting")
              : t("searchMotorcycle.status.disconnected")}
          </Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 50 }} />
        ) : erroMsg ? (
          <Text style={{ color: colors.text, textAlign: "center", marginTop: 30 }}>
            {erroMsg}
          </Text>
        ) : (
          <ListaMotos
            titulo={t("searchMotorcycle.title")}
            motos={motos}
            busca={busca}
            setBusca={setBusca}
            selected={selected}
            onLocalizar={localizar}
            onParar={parar}
            mostrarFiltro
            permitirLocalizar
          />
        )}

        <TouchableOpacity
          style={[styles.closeButton, { backgroundColor: colors.primary, marginBottom: 15 }]}
          onPress={onClose}
        >
          <MaterialCommunityIcons name="close" size={20} color="#FBFBFB" />
          <Text style={{ color: "#FBFBFB", fontSize: 16, marginLeft: 6 }}>
            {t("zoneModal.close")}
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