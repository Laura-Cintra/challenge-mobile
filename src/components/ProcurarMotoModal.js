import { useState, useEffect } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ListaMotos from "./ListaMotos";
import colors from "../theme/colors";
import { getMotos, getPatioById } from "../services/actions";
import { useUser } from "../providers/UserContext";

export default function ProcurarMotoModal({ visible, onClose }) {
  const { user } = useUser();

  const [busca, setBusca] = useState("");
  const [selected, setSelected] = useState(null);
  const [motos, setMotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erroMsg, setErroMsg] = useState("");

  const localizar = (moto) => setSelected(moto.placa ?? moto.chassi ?? moto.id?.toString());
  const parar = () => setSelected(null);

  useEffect(() => {
    if (visible) carregarMotos();
    if (!visible) {
      setMotos([]);
      setBusca("");
      setSelected(null);
      setErroMsg("");
    }
  }, [visible, user]);

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
        motosDoPatio = todas.filter((m) => (m.nomePatio ?? "").toLowerCase() === String(user.nomePatio).toLowerCase());
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

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 50 }} />
        ) : (
          <>
            {erroMsg ? (
              <View style={{ padding: 20, alignItems: "center" }}>
                <Text style={{ color: colors.text, fontSize: 16 }}>{erroMsg}</Text>
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

        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <MaterialCommunityIcons name="close" size={20} color={colors.white} />
          <Text style={{ color: colors.white, fontSize: 16, marginLeft: 6 }}>
            Fechar
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
  },
  closeButton: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 10,
  },
});