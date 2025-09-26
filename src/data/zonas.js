import colors from "../theme/colors";

// dicionário fixo, que nunca depende da API
export const zonasMap = {
  0: { nome: "Saguão", cor: colors.zona7 },
  1: { nome: "Manutenção Rápida", cor: colors.zona1 },
  2: { nome: "Danos Estruturais", cor: colors.zona2 },
  3: { nome: "Sem Placa", cor: colors.zona3 },
  4: { nome: "BO", cor: colors.zona4 },
  5: { nome: "Aluguel", cor: colors.zona5 },
  6: { nome: "Motor Defeituoso", cor: colors.zona6 },
};

// gera uma lista para iterar em pickers ou telas
export const zonasLista = Object.entries(zonasMap).map(([id, { nome, cor }]) => ({
  id: Number(id),
  nome,
  cor,
}));

console.log("ZonasMap:", zonasMap); // Verifique se está sendo carregado corretamente