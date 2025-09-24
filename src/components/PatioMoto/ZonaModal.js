import { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import colors from "../../theme/colors";
import { useMotos } from "../../providers/UseMotos";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ListaMotos from "../ListaMotos";
import MessageModal from "../MessageModal";
import EditarMotoModal from "./EditarMoto";

export default function ZonaModal({
  visible,
  onClose,
  zona,
  filtroBusca,
  setFiltroBusca,
}) {
  const { motos, deletarMotoPorId } = useMotos();
  const motosDaZona = motos.filter((moto) => moto.zona === zona);

  const [selected, setSelected] = useState(null);
  const [editarVisible, setEditarVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [motoSelecionada, setMotoSelecionada] = useState(null);

 const localizar = (moto) => {
    setSelected(moto.placa);
    console.log("Localizando", moto.placa);
  };

  const parar = () => {
    setSelected(null);
    console.log("Parando localização");
  };

  const editar = (moto) => {
    setMotoSelecionada(moto);
    setEditarVisible(true);
  };


  const confirmarExclusao = (moto) => {
    setMotoSelecionada(moto);
    setConfirmVisible(true);
  };

  const excluir = () => {
    if (motoSelecionada) {
      deletarMotoPorId(motoSelecionada.id);
    }
    setConfirmVisible(false);
    setMotoSelecionada(null);
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>{zona}</Text>
        <Text style={styles.modalSubtitle}>
          Total: {motosDaZona.length} motos
        </Text>

        <ListaMotos
          titulo={null}
          motos={motosDaZona}
          busca={filtroBusca}
          setBusca={setFiltroBusca}
          selected={selected}
          onLocalizar={localizar}
          onParar={parar}
          onEdit={editar}
          onDelete={confirmarExclusao}
          mostrarFiltro={true}
          permitirLocalizar={true}
          permitirEditar={true}
          permitirExcluir={true}
        />

        <TouchableOpacity style={styles.fecharBotao} onPress={onClose}>
          <MaterialCommunityIcons name="close" size={20} color={colors.white} />
          <Text style={{ color: "#fff", fontSize: 16, marginLeft: 6 }}>
            Fechar
          </Text>
        </TouchableOpacity>

        <MessageModal
          visible={confirmVisible}
          message={
            motoSelecionada
              ? `Tem certeza que deseja excluir a moto ${motoSelecionada.placa}?`
              : ""
          }
          isSuccess={false}
          onClose={() => setConfirmVisible(false)}
        >

          <TouchableOpacity
            style={styles.confirmDeleteButton}
            onPress={excluir}
          >
            <Text style={styles.confirmDeleteText}>Confirmar</Text>
          </TouchableOpacity>
        </MessageModal>

        <EditarMotoModal
          visible={editarVisible}
          onClose={() => setEditarVisible(false)}
          moto={motoSelecionada}
          zonasDisponiveis={["Manutenção Rápida", "Danos Estruturais", "Sem Placa", "Motor Defeituoso", "BO", "Aluguel", "Saguão"]}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 5,
  },
  modalSubtitle: {
    fontSize: 18,
    paddingVertical: 8,
    marginBottom: 10,
  },
  fecharBotao: {
    backgroundColor: colors.primary,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    borderRadius: 10,
  },
  confirmDeleteButton: {
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  confirmDeleteText: {
    color: "red",
    fontWeight: "bold",
  },
});