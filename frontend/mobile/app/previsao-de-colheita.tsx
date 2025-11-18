import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Animated,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { Ionicons } from "@expo/vector-icons";

export default function PrevisaoColheita() {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [viewMode, setViewMode] = useState<"Dia" | "Semana" | "Mês" | "Ano">("Mês");

  const events = [
    { id: "1", title: "Primeira colheita", time: "08:30 - 09:40" },
    { id: "2", title: "Revisão sensores", time: "10:00 - 10:30" },
    { id: "3", title: "Análise de qualidade", time: "11:15 - 12:00" },
  ];

  return (
    <View style={styles.container}>
      {/* 🌿 Título */}
      <Text style={styles.header}>Previsão de Colheita</Text>

      {/* 🗓️ Filtros de visualização */}
      <View style={styles.filterRow}>
        {["Dia", "Semana", "Mês", "Ano"].map((mode) => (
          <TouchableOpacity
            key={mode}
            style={[
              styles.filterButton,
              viewMode === mode && styles.filterButtonActive,
            ]}
            onPress={() => setViewMode(mode as any)}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.filterText,
                viewMode === mode && styles.filterTextActive,
              ]}
            >
              {mode}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 📆 Calendário */}
      <View style={styles.calendarContainer}>
        <Calendar
          onDayPress={(day) => setSelectedDate(day.dateString)}
          markedDates={{
            [selectedDate]: {
              selected: true,
              selectedColor: "#A9003F",
              selectedTextColor: "#fff",
            },
          }}
          theme={{
            todayTextColor: "#A9003F",
            arrowColor: "#A9003F",
          }}
          style={styles.calendar}
        />
      </View>

      {/* 📋 Eventos */}
      <View style={styles.eventSection}>
        <Text style={styles.eventTitle}>Próximos Eventos</Text>
        <FlatList
          data={events}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.eventCard}>
              <View style={styles.eventIcon}>
                <Ionicons name="leaf-outline" size={24} color="#fff" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.eventText}>{item.title}</Text>
                <Text style={styles.eventTime}>{item.time}</Text>
              </View>
            </View>
          )}
        />
      </View>

      {/* ➕ Botão de adicionar evento */}
      <TouchableOpacity style={styles.addButton} activeOpacity={0.8}>
        <Ionicons name="add" size={32} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

// 🎨 Estilos aprimorados
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF6F8",
    paddingTop: 50,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#A9003F",
    textAlign: "center",
    marginBottom: 15,
  },
  filterRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  filterButton: {
    backgroundColor: "#E8C8D3",
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
  },
  filterButtonActive: {
    backgroundColor: "#A9003F",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  filterText: {
    color: "#A9003F",
    fontWeight: "600",
  },
  filterTextActive: {
    color: "#fff",
    fontWeight: "bold",
  },
  calendarContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  calendar: {
    borderRadius: 12,
  },
  eventSection: {
    flex: 1,
    marginTop: 16,
    paddingHorizontal: 16,
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#A9003F",
    marginBottom: 12,
  },
  eventCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#A9003F",
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  eventIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#8B0035",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  eventText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
  eventTime: {
    color: "#FFD7E0",
    fontSize: 14,
    marginTop: 2,
  },
  addButton: {
    backgroundColor: "#A9003F",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
});
