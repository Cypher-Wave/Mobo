import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Calendar } from 'react-native-calendars';

export default function PrevisaoColheita() {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [viewMode, setViewMode] = useState<'Dia' | 'Semana' | 'Mês' | 'Ano'>('Mês');

  const events = [
    { id: '1', title: 'Primeira colheita', time: '08:30 AM - 09:40 AM' },
    { id: '2', title: 'Primeira colheita', time: '08:30 AM - 09:40 AM' },
  ];

  return (
    <View style={styles.container}>
      {/* Botões de Filtro */}
      <View style={styles.filterRow}>
        {['Dia', 'Semana', 'Mês', 'Ano'].map((mode) => (
          <TouchableOpacity
            key={mode}
            style={[
              styles.filterButton,
              viewMode === mode && styles.filterButtonActive,
            ]}
            onPress={() => setViewMode(mode as any)}
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

      {/* Calendário */}
      <Calendar
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={{
          [selectedDate]: {
            selected: true,
            selectedColor: '#b70a49',
            selectedTextColor: '#fff',
          },
        }}
        theme={{
          todayTextColor: '#b70a49',
          arrowColor: '#b70a49',
        }}
        style={styles.calendar}
      />

      {/* Eventos */}
      <View style={styles.eventSection}>
        <Text style={styles.eventTitle}>Principais Eventos</Text>
        <FlatList
          data={events}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.eventCard}>
              <Text style={styles.eventText}>• {item.title}</Text>
              <Text style={styles.eventTime}>{item.time}</Text>
            </View>
          )}
        />
      </View>

      {/* Botão adicionar */}
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>＋</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ece2d6',
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 12,
  },
  filterButton: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#d890a5',
  },
  filterButtonActive: {
    backgroundColor: '#b70a49',
  },
  filterText: {
    color: '#fff',
    fontSize: 15,
  },
  filterTextActive: {
    fontWeight: 'bold',
  },
  calendar: {
    marginHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    elevation: 3,
  },
  eventSection: {
    flex: 1,
    marginTop: 16,
    paddingHorizontal: 16,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 8,
  },
  eventCard: {
    backgroundColor: '#b70a49',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  eventText: {
    color: '#fff',
    fontSize: 16,
  },
  eventTime: {
    color: '#fce4ec',
    fontSize: 14,
    marginTop: 4,
  },
  addButton: {
    backgroundColor: '#b70a49',
    width: 55,
    height: 55,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 16,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
});
