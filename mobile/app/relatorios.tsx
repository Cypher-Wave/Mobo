import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";

export default function Relatorios() {
  const [selected, setSelected] = useState<number[]>([]);

  const relatorios = Array.from({ length: 11 }, (_, i) => i + 1);

  const toggleSelect = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.tableWrapper}>
        <View style={styles.table}>
          {/* Cabeçalho da tabela */}
          <View style={styles.rowHeader}>
            <Text style={styles.headerCell}>SELECIONAR</Text>
            <Text style={styles.headerCell}>ID RELATÓRIOS</Text>
          </View>

          {/* Linhas da tabela */}
          {relatorios.map((id) => (
            <View key={id} style={styles.row}>
              <TouchableOpacity
                style={[
                  styles.checkbox,
                  selected.includes(id) && styles.checkboxSelected,
                ]}
                onPress={() => toggleSelect(id)}
              />
              <Text style={styles.cell}>{id}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5E9DC",
  },
  tableWrapper: {
    padding: 20,
  },
  table: {
    borderWidth: 2,
    borderColor: "#A9003F",
    borderRadius: 20,
    overflow: "hidden",
  },
  rowHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "#F5E9DC",
    borderBottomWidth: 2,
    borderColor: "#A9003F",
  },
  headerCell: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#A9003F",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: "#A9003F",
    backgroundColor: "#F5E9DC",
  },
  cell: {
    fontSize: 14,
    color: "#A9003F",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#000",
    backgroundColor: "#fff",
  },
  checkboxSelected: {
    backgroundColor: "#A9003F",
    borderColor: "#A9003F",
  },
});
