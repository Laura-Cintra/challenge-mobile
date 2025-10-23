import { useState } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import { useMotos } from "../../providers/UseMotos";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ListaMotos from "../ListaMotos";
import EditarMotoModal from "./EditarMoto";
import ConfirmarExclusaoModal from "../ConfirmarExclusaoModal";
import { useTheme } from "../../providers/ThemeContext";
import { useTranslation } from "react-i18next";

export default function ZonaModal({
  visible,
  onClose,
  zona,
  filtroBusca,
  setFiltroBusca,
}) {
  const { motos, editarMoto, deletarMotoPorId } = useMotos();
  const { colors } = useTheme();
  const { t } = useTranslation();

  const [selected, setSelected] = useState(null);
  const [editarVisible, setEditarVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [motoSelecionada, setMotoSelecionada] = useState(null);

  const motosDaZona = motos.filter((moto) => moto.zona === zona?.id);

  return (
    <Modal visible={visible} animationType="slide">
      <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
        <Text style={[styles.modalTitle, { color: colors.title }]}>
          {zona ? t(`zones.${zona.id}`) : ""}
        </Text>
        <Text style={[styles.modalSubtitle, { color: colors.text }]}>
          {t("zoneModal.total", { count: motosDaZona.length })}
        </Text>

        {motosDaZona.length === 0 ? (
          <Text
            style={{
              textAlign: "center",
              marginTop: 20,
              color: colors.placeholder,
            }}
          >
            {t("zoneModal.noMotorcycle")}
          </Text>
        ) : (
          <ListaMotos
            titulo={null}
            motos={motosDaZona}
            busca={filtroBusca}
            setBusca={setFiltroBusca}
            selected={selected}
            onLocalizar={(m) => setSelected(m.placa)}
            onParar={() => setSelected(null)}
            onEdit={(m) => {
              setMotoSelecionada(m);
              setEditarVisible(true);
            }}
            onDelete={(m) => {
              setMotoSelecionada(m);
              setConfirmVisible(true);
            }}
            mostrarFiltro={true}
            permitirLocalizar={true}
            permitirEditar={true}
            permitirExcluir={true}
          />
        )}

        <TouchableOpacity
          style={[styles.fecharBotao, { backgroundColor: colors.primary }]}
          onPress={onClose}
        >
          <MaterialCommunityIcons name="close" size={20} color={colors.white} />
          <Text style={{ color: colors.white, fontSize: 16, marginLeft: 6 }}>
            {t("zoneModal.close")}
          </Text>
        </TouchableOpacity>

        <ConfirmarExclusaoModal
          visible={confirmVisible}
          onClose={() => setConfirmVisible(false)}
          onConfirm={async () => {
            await deletarMotoPorId(motoSelecionada.id);
            setConfirmVisible(false);
            setMotoSelecionada(null);
          }}
          mensagem={t("zoneModal.confirmDeletion", {
            placa: motoSelecionada?.placa,
          })}
        />

        <EditarMotoModal
          visible={editarVisible}
          onClose={() => setEditarVisible(false)}
          moto={motoSelecionada}
          onSave={editarMoto}
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