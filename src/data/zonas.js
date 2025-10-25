import colors from "../theme/colors";

export const zonasMap = {
  0: { cor: colors.zona7 },
  1: { cor: colors.zona1 },
  2: { cor: colors.zona2 },
  3: { cor: colors.zona3 },
  4: { cor: colors.zona4 },
  5: { cor: colors.zona5 },
  6: { cor: colors.zona6 },
};

const _entries = Object.entries(zonasMap || {});
export const zonasLista = _entries.map(([id, { cor }]) => ({
  id: Number(id),
  cor,
}));