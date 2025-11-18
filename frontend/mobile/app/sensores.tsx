import React from 'react';
import { View, Text, Dimensions, ScrollView, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;
const chartWidth = screenWidth - 120; // margem ajustada para não cortar o gráfico
const chartHeight = 300;

export default function Sensores() {
  // Dados dos gráficos
  const pieDataSolo = [
    { name: 'Excelente', population: 25, color: '#5E7041', legendFontColor: '#444', legendFontSize: 14 },
    { name: 'Boa', population: 35, color: '#788D54', legendFontColor: '#444', legendFontSize: 14 },
    { name: 'Média', population: 20, color: '#A2B878', legendFontColor: '#444', legendFontSize: 14 },
    { name: 'Ruim', population: 20, color: '#C6D3A7', legendFontColor: '#444', legendFontSize: 14 },
  ];

  const pieDataAr = [
    { name: 'Excelente', population: 20, color: '#830533', legendFontColor: '#444', legendFontSize: 14 },
    { name: 'Boa', population: 40, color: '#B70A49', legendFontColor: '#444', legendFontSize: 14 },
    { name: 'Média', population: 20, color: '#AE5877', legendFontColor: '#444', legendFontSize: 14 },
    { name: 'Ruim', population: 20, color: '#E2A2B8', legendFontColor: '#444', legendFontSize: 14 },
  ];

  const pieDataTemp = [
    { name: 'Excelente', population: 25, color: '#5E7041', legendFontColor: '#444', legendFontSize: 14 },
    { name: 'Boa', population: 35, color: '#788D54', legendFontColor: '#444', legendFontSize: 14 },
    { name: 'Média', population: 20, color: '#A2B878', legendFontColor: '#444', legendFontSize: 14 },
    { name: 'Ruim', population: 20, color: '#C6D3A7', legendFontColor: '#444', legendFontSize: 14 },
  ];

  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Sensores</Text>

      {/* Mapa */}
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: -24.4933,
            longitude: -47.8439,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
        >
          <Marker coordinate={{ latitude: -24.4933, longitude: -47.8439 }} />
          <Marker coordinate={{ latitude: -24.4900, longitude: -47.8400 }} />
          <Marker coordinate={{ latitude: -24.4960, longitude: -47.8500 }} />
          <Marker coordinate={{ latitude: -24.4880, longitude: -47.8450 }} />
        </MapView>

        <View style={styles.checkboxContainer}>
          <View style={styles.checkboxSquare} />
          <Text style={styles.checkboxLabel}>Sensores</Text>
        </View>
      </View>

      {/* Gráfico - Umidade do Solo */}
      <View style={styles.chartBox}>
        <Text style={styles.chartTitle}>Umidade do Solo</Text>
        <PieChart
          data={pieDataSolo}
          width={chartWidth}
          height={chartHeight}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      </View>

      {/* Gráfico - Umidade do Ar */}
      <View style={styles.chartBox}>
        <Text style={styles.chartTitle}>Umidade do Ar</Text>
        <PieChart
          data={pieDataAr}
          width={chartWidth}
          height={chartHeight}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      </View>

      {/* Gráfico - Temperatura */}
      <View style={styles.chartBox}>
        <Text style={styles.chartTitle}>Temperatura</Text>
        <PieChart
          data={pieDataTemp}
          width={chartWidth}
          height={chartHeight}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5e9da',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#b70a49',
    marginBottom: 16,
  },
  mapContainer: {
    width: '95%',
    backgroundColor: '#fff',
    borderRadius: 28,
    borderWidth: 5,
    borderColor: '#b70a49',
    overflow: 'hidden',
    marginBottom: 25,
    alignItems: 'center',
    marginLeft: 14,
},
    map: {
    width: '100%',
    height: 600, // 👈 aumentei a altura do mapa aqui
  },

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  checkboxSquare: {
    width: 18,
    height: 18,
    borderRadius: 4,
    backgroundColor: '#ddd',
    marginRight: 8,
  },
  checkboxLabel: {
    color: '#444',
    fontSize: 14,
  },
  chartBox: {
    width: '95%',
    backgroundColor: '#fff',
    borderRadius: 28,
    borderWidth: 5,
    borderColor: '#b70a49',
    alignSelf: 'center',
    paddingVertical: 12,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    height: 400,
  },
  chartTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3b3b3b',
    marginBottom: 20,
    marginTop: 15,
  },
});
