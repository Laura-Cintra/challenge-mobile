import { useState } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import { useMotos } from "../../providers/UseMotos";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ListaMotos from "../ListaMotos";
import EditarMotoModal from "./EditarMoto";
import ConfirmarExclusaoModal from "../ConfirmarExclusaoModal";
import { useTheme } from "../../providers/ThemeContext";
import { useTranslation } from "react-i18next";
import { MotiView, MotiText } from "moti";

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
    <Modal visible={visible} animationType="slide" transparent={false}>
      <MotiView
        from={{ opacity: 0, translateY: 30 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 500 }}
        style={[styles.modalContent, { backgroundColor: colors.background }]}
      >
        <MotiText
          from={{ opacity: 0, translateY: -10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 100 }}
          style={[styles.modalTitle, { color: colors.title }]}
        >
          {zona ? t(`zones.${zona.id}`) : ""}
        </MotiText>

        <MotiText
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 200 }}
          style={[styles.modalSubtitle, { color: colors.text }]}
        >
          {t("zoneModal.total", { count: motosDaZona.length })}
        </MotiText>

        {motosDaZona.length === 0 ? (
          <MotiText
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 300 }}
            style={{
              textAlign: "center",
              marginTop: 20,
              color: colors.placeholder,
            }}
          >
            {t("zoneModal.noMotorcycle")}
          </MotiText>
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

        <MotiView
          from={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 400 }}
        >
          <TouchableOpacity
            style={[
              styles.fecharBotao,
              { backgroundColor: colors.primary, marginBottom: 15 },
            ]}
            onPress={onClose}
          >
            <MaterialCommunityIcons
              name="close"
              size={20}
              color={colors.white}
            />
            <Text style={{ color: colors.white, fontSize: 16, marginLeft: 6 }}>
              {t("zoneModal.close")}
            </Text>
          </TouchableOpacity>
        </MotiView>

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
      </MotiView>
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