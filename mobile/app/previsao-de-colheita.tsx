import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import { CalendarList } from 'react-native-calendars';
import type { DateObject, MarkedDates } from 'react-native-calendars/src/types';

interface Period {
  start: string;
  end: string;
  note?: string;
}

export default function PrevisaoColheita() {
  const [periods, setPeriods] = useState<Period[]>([]);
  const [selecting, setSelecting] = useState<'start' | 'end'>('start');
  const [currentStart, setCurrentStart] = useState<string | null>(null);
  const [note, setNote] = useState('');

  const onDayPress = (day: DateObject) => {
    const dateStr = day.dateString;

    if (selecting === 'start') {
      setCurrentStart(dateStr);
      setSelecting('end');
    } else {
      if (!currentStart) {
        setSelecting('start');
        return;
      }

      const start = new Date(currentStart);
      const end = new Date(dateStr);

      if (end < start) {
        Alert.alert('Erro', 'A data de término não pode ser antes da data de início.');
        return;
      }

      const newPeriod: Period = {
        start: currentStart,
        end: dateStr,
        note: note.trim(),
      };

      setPeriods([...periods, newPeriod]);
      setNote('');
      setCurrentStart(null);
      setSelecting('start');
    }
  };

  const getMarkedDates = (): MarkedDates => {
    const marks: MarkedDates = {};

    periods.forEach((p) => {
      const start = new Date(p.start);
      const end = new Date(p.end);

      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        const ds = d.toISOString().split('T')[0];
        const isStart = ds === p.start;
        const isEnd = ds === p.end;

        marks[ds] = {
          color: '#b70a49',
          textColor: '#fff',
          startingDay: isStart,
          endingDay: isEnd,
        };
      }
    });

    return marks;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Previsão de Colheita</Text>

      <CalendarList
        horizontal
        pagingEnabled
        calendarWidth={350}
        onDayPress={onDayPress}
        pastScrollRange={12}
        futureScrollRange={12}
        markingType="period"
        markedDates={getMarkedDates()}
        theme={{
          todayTextColor: '#b70a49',
          selectedDayBackgroundColor: '#b70a49',
          selectedDayTextColor: '#fff',
          arrowColor: '#b70a49',
        }}
        style={styles.calendar}
      />

      <View style={styles.info}>
        {selecting === 'end' && currentStart ? (
          <Text style={styles.infoText}>
            Escolha a data final para iniciar em <Text style={{ fontWeight: 'bold' }}>{currentStart}</Text>
          </Text>
        ) : (
          <Text style={styles.infoText}>Toque uma data para iniciar um novo período</Text>
        )}
      </View>

      {/* Campo para notas */}
      <TextInput
        style={styles.noteInput}
        placeholder="Adicionar observações (ex: tipo da colheita, clima...)"
        placeholderTextColor="#888"
        value={note}
        onChangeText={setNote}
        multiline
      />

      <TouchableOpacity
        style={styles.clearButton}
        onPress={() => {
          setPeriods([]);
          setCurrentStart(null);
          setNote('');
          setSelecting('start');
        }}
      >
        <Text style={styles.clearText}>Limpar Períodos</Text>
      </TouchableOpacity>

      {/* Lista de notas salvas */}
      {periods.length > 0 && (
        <View style={styles.notesList}>
          <Text style={styles.notesTitle}>Períodos Salvos:</Text>
          {periods.map((p, i) => (
            <View key={i} style={styles.noteItem}>
              <Text style={styles.noteText}>
                📅 {p.start} → {p.end}
              </Text>
              {p.note ? <Text style={styles.noteContent}>📝 {p.note}</Text> : null}
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ece2d6',
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#b70a49',
    marginBottom: 12,
    textAlign: 'center',
  },
  calendar: {
    borderRadius: 12,
    marginBottom: 10,
  },
  info: {
    marginTop: 8,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 16,
    color: '#444',
  },
  noteInput: {
    marginTop: 16,
    backgroundColor: '#fff',
    borderColor: '#b70a49',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#333',
    minHeight: 60,
  },
  clearButton: {
    marginTop: 16,
    backgroundColor: '#b70a49',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  clearText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  notesList: {
    marginTop: 20,
  },
  notesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#b70a49',
    marginBottom: 8,
  },
  noteItem: {
    backgroundColor: '#f3e8dd',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  noteText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  noteContent: {
    fontSize: 14,
    marginTop: 4,
  },
});
