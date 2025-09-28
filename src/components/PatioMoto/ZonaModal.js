import { useState } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import { useMotos } from "../../providers/UseMotos";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ListaMotos from "../ListaMotos";
import EditarMotoModal from "./EditarMoto";
import ConfirmarExclusaoModal from "../ConfirmarExclusaoModal";
import { useTheme } from "../../providers/ThemeContext";

export default function ZonaModal({ visible, onClose, zona, filtroBusca, setFiltroBusca }) {
  const { motos, editarMoto, deletarMotoPorId } = useMotos();
  const { colors } = useTheme();

  const [selected, setSelected] = useState(null);
  const [editarVisible, setEditarVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [motoSelecionada, setMotoSelecionada] = useState(null);

  const motosDaZona = motos.filter((moto) => moto.zona === zona?.id);

  const localizar = (moto) => setSelected(moto.placa);
  const parar = () => setSelected(null);

  const editar = (moto) => {
    setMotoSelecionada(moto);
    setEditarVisible(true);
  };

  const confirmarExclusao = (moto) => {
    setMotoSelecionada(moto);
    setConfirmVisible(true);
  };

  const excluir = async () => {
    if (motoSelecionada) {
      try {
        await deletarMotoPorId(motoSelecionada.id);
      } catch (error) {
        console.error("Erro ao excluir moto:", error);
      }
    }
    setConfirmVisible(false);
    setMotoSelecionada(null);
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
        <Text style={[styles.modalTitle, { color: colors.title }]}>{zona?.nome}</Text>
        <Text style={[styles.modalSubtitle, { color: colors.text }]}>
          Total: {motosDaZona.length} motos
        </Text>

        {motosDaZona.length === 0 ? (
          <Text style={{ textAlign: "center", marginTop: 20, color: colors.placeholder }}>
            Nenhuma moto nessa zona
          </Text>
        ) : (
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
        )}

        <TouchableOpacity style={[styles.fecharBotao, { backgroundColor: colors.primary }]} onPress={onClose}>
          <MaterialCommunityIcons name="close" size={20} color={colors.white} />
          <Text style={{ color: colors.white, fontSize: 16, marginLeft: 6 }}>Fechar</Text>
        </TouchableOpacity>

        <ConfirmarExclusaoModal
          visible={confirmVisible}
          onClose={() => setConfirmVisible(false)}
          onConfirm={excluir}
          mensagem={`Tem certeza que deseja excluir a moto ${motoSelecionada?.placa}?`}
        />

        <EditarMotoModal
          visible={editarVisible}
          onClose={() => setEditarVisible(false)}
          moto={motoSelecionada}
          onSave={async (id, dados) => {
            try {
              const response = await editarMoto(id, dados);
              return response;
            } catch (error) {
              console.error("Erro ao editar moto:", error);
              throw error;
            }
          }}
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
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    borderRadius: 10,
  },
});