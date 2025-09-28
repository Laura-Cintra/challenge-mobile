import { View, Text, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useState } from "react";
import { useTheme } from "../../providers/ThemeContext";

export default function InputSelectDropdown({ 
  label, 
  selectedValue, 
  onValueChange, 
  items, 
  zIndex = 1000
}) {
  const { colors } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <View style={[styles.container, { zIndex }]}>
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      <DropDownPicker
        open={open}
        value={selectedValue}
        items={items}
        setOpen={setOpen}
        setValue={onValueChange}
        listMode="SCROLLVIEW"
        style={{
          backgroundColor: colors.background,
          borderColor: colors.border,
        }}
        dropDownContainerStyle={{
          backgroundColor: colors.background,
          borderColor: colors.border,
          zIndex: zIndex + 1000,
          elevation: 1000,
        }}
        textStyle={{
          color: colors.text,
        }}
        placeholder={`Selecione ${label.toLowerCase()}...`}
        placeholderStyle={{ color: colors.placeholder }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    marginBottom: 16 
  },
  label: { 
    marginBottom: 4, 
    fontWeight: "600" 
  },
});