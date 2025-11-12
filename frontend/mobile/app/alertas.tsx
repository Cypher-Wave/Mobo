import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  useFonts,
  Livvic_400Regular,
  Livvic_600SemiBold,
  Livvic_700Bold,
} from "@expo-google-fonts/livvic";

export default function Alertas() {
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    Livvic_400Regular,
    Livvic_600SemiBold,
    Livvic_700Bold,
  });

  if (!fontsLoaded) return null;

  const daysInMonth = 30;
  const firstDayOfWeek = 1;
  const calendarDays = [];

  for (let i = 0; i < firstDayOfWeek; i++) calendarDays.push(null);
  for (let day = 1; day <= daysInMonth; day++) calendarDays.push(day);

  const weeks = [];
  for (let i = 0; i < calendarDays.length; i += 7)
    weeks.push(calendarDays.slice(i, i + 7));

  const today = 7;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
        {/* 🔍 Barra de pesquisa */}
        <View style={styles.searchRow}>
          <Image
            source={require("../assets/images/perfilFoto.png")}
            style={styles.avatar}
          />
          <TextInput
            placeholder="Pesquisar"
            style={styles.searchInput}
            placeholderTextColor="#888"
          />
          <View style={styles.notificationWrapper}>
            <Ionicons name="notifications-outline" size={35} color="#A9003F" />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
          </View>
        </View>

        {/* 📂 Categorias */}
        <Text style={styles.sectionTitle}>Categorias</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScroll}
        >
          {["Favoritos", "Curiosidades","Plantio", "Receitas"].map(
            (cat, i) => (
              <TouchableOpacity
                key={i}
                style={styles.categoryBtn}
                onPress={() => {
                  if (cat === "Curiosidades") {
                    router.push("/curiosidades"); // 👈 leva pra tela Curiosidades
                  }
                }}
              >
                <Text style={styles.categoryText}>{cat}</Text>
              </TouchableOpacity>
            )
          )}
        </ScrollView>

        {/* ⚠️ Alerta principal */}
        <View style={styles.alertSection}>
          <Text style={styles.sectionTitle}>Alertas ▼</Text>

          <View style={styles.alertCard}>
            <Text style={styles.alertTitle}>Alto nível de umidade do solo!</Text>
            <View style={styles.alertInfoRow}>
              <Text style={styles.alertTemp}>15°</Text>
              <View style={styles.alertDivider} />
              <Image
                source={{
                  uri: "https://img.icons8.com/emoji/96/cloud-with-lightning-and-rain.png",
                }}
                style={{ width: 50, height: 50 }}
              />
            </View>
            <View style={styles.alertDetails}>
              <Text style={styles.alertDetail}>💨 Ventos 10m/s</Text>
              <Text style={styles.alertDetail}>💧 Umidade 82%</Text>
            </View>
          </View>
        </View>

        {/* 🌦️ Previsão 5 dias */}
        <View style={styles.forecastRow}>
          {[
            { date: "12/09", temp: "20°", icon: "🌧️", active: true },
            { date: "13/09", temp: "15°", icon: "🌧️" },
            { date: "14/09", temp: "29°", icon: "⛅" },
            { date: "15/09", temp: "18°", icon: "🌧️" },
            { date: "16/09", temp: "22°", icon: "🌧️" },
          ].map((item, i) => (
            <View
              key={i}
              style={[
                styles.forecastCard,
                item.active && styles.forecastCardActive,
              ]}
            >
              <Text
                style={[
                  styles.forecastDate,
                  item.active && { color: "#fff" },
                ]}
              >
                {item.date}
              </Text>
              <Text style={styles.forecastIcon}>{item.icon}</Text>
              <Text
                style={[
                  styles.forecastTemp,
                  item.active && { color: "#fff" },
                ]}
              >
                {item.temp}
              </Text>
            </View>
          ))}
        </View>

        {/* 🗓️ Calendário */}
        <View style={styles.calendarCard}>
          <Text style={styles.calendarTitle}>Calendário</Text>
          <View style={styles.calendarRow}>
            {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((d, i) => (
              <Text key={i} style={styles.calendarDay}>
                {d}
              </Text>
            ))}
          </View>

          {weeks.map((week, i) => (
            <View key={i} style={styles.calendarRow}>
              {week.map((day, idx) => (
                <View key={idx} style={styles.calendarDayWrapper}>
                  {day ? (
                    <Text
                      style={[
                        styles.calendarDayNumber,
                        day === today && styles.calendarDayToday,
                      ]}
                    >
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
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 40,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 75,
    marginRight: 8,
    borderWidth: 2,
    borderColor: "#617D3D",
  },
  searchInput: {
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 42,
    width: 340,
    fontFamily: "Livvic_400Regular",
    borderWidth: 1.5,
    borderColor: "#A9003F33",
  },
  notificationWrapper: {
    marginLeft: 8,
  },
  badge: {
    position: "absolute",
    right: -5,
    top: -5,
    backgroundColor: "#A9003F",
    borderRadius: 10,
    paddingHorizontal: 6,
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontFamily: "Livvic_700Bold",
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "Livvic_700Bold",
    marginLeft: 22,
    marginTop: 25,
    marginBottom: 18,
    color: "#3A2D2D",
  },
  categoryScroll: {
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  categoryBtn: {
    backgroundColor: "#A9003F",
    borderRadius: 25,
    paddingVertical: 16,
    paddingHorizontal: 35,
    marginHorizontal: 8,
    elevation: 3,
  },
  categoryText: {
    color: "#fff",
    fontFamily: "Livvic_700Bold",
    fontSize: 16,
  },
  alertSection: { marginTop: 10 },
  alertCard: {
    backgroundColor: "#A9003F",
    borderRadius: 25,
    alignSelf: "center",
    width: "80%",
    marginTop: 15,
    padding: 38,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 6,
  },
  alertTitle: {
    color: "#fff",
    fontFamily: "Livvic_700Bold",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 15,
  },
  alertInfoRow: { flexDirection: "row", alignItems: "center", marginVertical: 10 },
  alertTemp: { color: "#fff", fontSize: 40, fontFamily: "Livvic_700Bold" },
  alertDivider: { width: 3, height: 40, backgroundColor: "#fff", marginHorizontal: 15 },
  alertDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
  },
  alertDetail: { color: "#fff", fontFamily: "Livvic_600SemiBold", fontSize: 15 },
  forecastRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 32,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  forecastCard: {
    borderWidth: 2,
    borderColor: "#A9003F",
    borderRadius: 65,
    paddingVertical: 20,
    paddingHorizontal: 18,
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 10,
    minWidth: 45,
    elevation: 5,
  },
  forecastCardActive: {
    backgroundColor: "#A9003F",
    borderColor: "#A9003F",
  },
  forecastDate: { fontSize: 13, color: "#A9003F", fontFamily: "Livvic_600SemiBold" },
  forecastIcon: { fontSize: 40, marginVertical: 4 },
  forecastTemp: { fontSize: 15, color: "#A9003F", fontFamily: "Livvic_700Bold" },
  calendarCard: {
    margin: 20,
    borderRadius: 20,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#A9003F",
    paddingBottom: 15,
    elevation: 5,
  },
  calendarTitle: {
    backgroundColor: "#A9003F",
    color: "#fff",
    fontFamily: "Livvic_700Bold",
    fontSize: 18,
    textAlign: "center",
    paddingVertical: 10,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  calendarRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  calendarDay: { fontFamily: "Livvic_600SemiBold", fontSize: 14, color: "#000" },
  calendarDayWrapper: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  calendarDayNumber: {
    fontFamily: "Livvic_600SemiBold",
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
