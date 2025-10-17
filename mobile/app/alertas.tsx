import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Alertas() {
  const daysInMonth = 30;
  const firstDayOfWeek = 1; // 0=Domingo, 1=Segunda, etc.

  const calendarDays = [];

  for (let i = 0; i < firstDayOfWeek; i++) {
    calendarDays.push(null); // dias vazios
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const weeks = [];
  for (let i = 0; i < calendarDays.length; i += 7) {
    weeks.push(calendarDays.slice(i, i + 7));
  }

  const today = 7;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
        {/* Barra de pesquisa com avatar e sino */}
        <View style={styles.searchRow}>
          <Image
            source={{ uri: "https://i.pravatar.cc/100" }}
            style={styles.avatar}
          />
          <TextInput placeholder="Pesquisar" style={styles.searchInput} />
          <View style={styles.notificationWrapper}>
            <Ionicons name="notifications-outline" size={28} color="#A9003F" />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
          </View>
        </View>

        {/* Categorias */}
        <Text style={styles.sectionTitle}>Categorias</Text>
        <View style={styles.categoryRow}>
          <TouchableOpacity style={styles.categoryBtn}>
            <Text style={styles.categoryText}>Favoritos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryBtn}>
            <Text style={styles.categoryText}>Curiosidades</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryBtn}>
            <Text style={styles.categoryText}>Alertas</Text>
          </TouchableOpacity>
        </View>

        {/* Alertas */}
        <View style={{ marginTop: 20 }}>
          <Text style={styles.sectionTitle}>Alertas ▼</Text>

          {/* Card alerta */}
          <View style={styles.alertCard}>
            <Text style={styles.alertTitle}>Alto nível de umidade do solo!</Text>
            <View style={styles.alertInfoRow}>
              <Text style={styles.alertTemp}>15°</Text>
              <View style={styles.alertDivider} />
              <Image
                source={{ uri: "https://img.icons8.com/emoji/96/cloud-with-lightning-and-rain.png" }}
                style={{ width: 50, height: 50 }}
              />
            </View>
            <View style={styles.alertDetails}>
              <Text style={styles.alertDetail}>ventos 10m/s</Text>
              <Text style={styles.alertDetail}>umidade 82%</Text>
            </View>
          </View>
        </View>

        {/* Previsão 5 dias */}
        <View style={styles.forecastRow}>
          {[
            { date: "12/09", temp: "20°", icon: "🌧️", active: true },
            { date: "13/09", temp: "15°", icon: "🌧️" },
            { date: "14/09", temp: "29°", icon: "⛅" },
            { date: "15/09", temp: "18°", icon: "🌧️" },
            { date: "16/09", temp: "22°", icon: "🌧️" },
          ].map((item, index) => (
            <View
              key={index}
              style={[styles.forecastCard, item.active && styles.forecastCardActive]}
            >
              <Text style={[styles.forecastDate, item.active && { color: "#fff" }]}>{item.date}</Text>
              <Text style={styles.forecastIcon}>{item.icon}</Text>
              <Text style={[styles.forecastTemp, item.active && { color: "#fff" }]}>{item.temp}</Text>
            </View>
          ))}
        </View>

        {/* Calendário */}
        <View style={styles.calendarCard}>
          <Text style={styles.calendarTitle}>Calendário</Text>
          <View style={styles.calendarRow}>
            {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((d, i) => (
              <Text key={i} style={styles.calendarDay}>{d}</Text>
            ))}
          </View>
          {weeks.map((week, i) => (
            <View key={i} style={styles.calendarRow}>
              {week.map((day, idx) => (
                <View key={idx} style={styles.calendarDayWrapper}>
                  {day ? (
                    <Text style={[styles.calendarDayNumber, day === today && styles.calendarDayToday]}>
                      {day}
                    </Text>
                  ) : (
                    <Text style={styles.calendarDayNumber}></Text>
                  )}
                </View>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5E9DC" },

  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    margin: 20,
  },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
  searchInput: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 40,
  },
  notificationWrapper: { marginLeft: 10 },
  badge: {
    position: "absolute",
    right: -5,
    top: -5,
    backgroundColor: "#A9003F",
    borderRadius: 10,
    paddingHorizontal: 6,
  },
  badgeText: { color: "#fff", fontSize: 12, fontWeight: "bold" },

  sectionTitle: { fontSize: 18, fontWeight: "bold", marginLeft: 20, marginTop: 10 },

  categoryRow: { flexDirection: "row", justifyContent: "space-around", marginTop: 15 },
  categoryBtn: {
    backgroundColor: "#A9003F",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  categoryText: { color: "#fff", fontWeight: "bold" },

  alertCard: {
    backgroundColor: "#A9003F",
    borderRadius: 20,
    margin: 20,
    padding: 20,
    alignItems: "center",
  },
  alertTitle: { color: "#fff", fontWeight: "bold", marginBottom: 10 },
  alertInfoRow: { flexDirection: "row", alignItems: "center", marginVertical: 10 },
  alertTemp: { color: "#fff", fontSize: 40, fontWeight: "bold" },
  alertDivider: { width: 2, height: 40, backgroundColor: "#fff", marginHorizontal: 15 },
  alertDetails: { flexDirection: "row", justifyContent: "space-between", width: "100%" },
  alertDetail: { color: "#fff", fontSize: 14, fontWeight: "bold" },

  forecastRow: { flexDirection: "row", justifyContent: "space-around", marginHorizontal: 10 },
  forecastCard: {
    borderWidth: 2,
    borderColor: "#A9003F",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    width: 60,
  },
  forecastCardActive: { backgroundColor: "#A9003F" },
  forecastDate: { fontSize: 12, color: "#A9003F", fontWeight: "bold" },
  forecastIcon: { fontSize: 22, marginVertical: 5 },
  forecastTemp: { fontSize: 14, color: "#A9003F", fontWeight: "bold" },

  calendarCard: {
    margin: 20,
    borderRadius: 15,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#A9003F",
    paddingBottom: 15,
  },
  calendarTitle: {
    backgroundColor: "#A9003F",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    paddingVertical: 8,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  calendarRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  calendarDay: { fontWeight: "bold", fontSize: 14, color: "#000" },
  calendarDayWrapper: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  calendarDayNumber: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#000",
  },
  calendarDayToday: {
    backgroundColor: "#A9003F",
    color: "#fff",
    borderRadius: 20,
    width: 30,
    height: 30,
    textAlign: "center",
    lineHeight: 30,
  },
});
