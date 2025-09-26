import colors from "../theme/colors";

export const zonasMap = {
  0: { nome: "Saguão", cor: colors.zona7 },
  1: { nome: "Manutenção Rápida", cor: colors.zona1 },
  2: { nome: "Danos Estruturais", cor: colors.zona2 },
  3: { nome: "Sem Placa", cor: colors.zona3 },
  4: { nome: "BO", cor: colors.zona4 },
  5: { nome: "Aluguel", cor: colors.zona5 },
  6: { nome: "Motor Defeituoso", cor: colors.zona6 },
};

const _entries = Object.entries(zonasMap || {});
export const zonasLista = _entries.map(([id, { nome, cor }]) => ({
  id: Number(id),
  nome,
  cor,
}));

export const zonas = zonasLista.map(({ id, nome, cor }) => ({ id, nome, cor }));