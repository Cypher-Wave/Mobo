import React from 'react';
import { View, Text, Dimensions, ScrollView, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;
const squareWidth = screenWidth - 32; // margem lateral
const squareHeight = 250;

export default function Dashboard() {
  // Gráfico 1: Qualidade de Colheita (cores #879C5F #B4C297 #61743D #3C4C27)
  const pieDataQualidadeColheita = [
    { name: 'Excelente', population: 35, color: '#879C5F', legendFontColor: '#444', legendFontSize: 14 },
    { name: 'Boa', population: 30, color: '#B4C297', legendFontColor: '#444', legendFontSize: 14 },
    { name: 'Média', population: 20, color: '#61743D', legendFontColor: '#444', legendFontSize: 14 },
    { name: 'Ruim', population: 15, color: '#3C4C27', legendFontColor: '#444', legendFontSize: 14 },
  ];

  // Gráfico 2: Colheita da Semana (cores #830533 #AE5877 #B6295C #B70A49)
  const pieDataColheitaSemana = [
    { name: 'Excelente', population: 40, color: '#830533', legendFontColor: '#444', legendFontSize: 14 },
    { name: 'Boa', population: 25, color: '#AE5877', legendFontColor: '#444', legendFontSize: 14 },
    { name: 'Média', population: 20, color: '#B6295C', legendFontColor: '#444', legendFontSize: 14 },
    { name: 'Ruim', population: 15, color: '#B70A49', legendFontColor: '#444', legendFontSize: 14 },
  ];

  // Gráfico 3: Tendência de Crescimento (cores #879C5F #B4C297 #61743D #3C4C27)
  const pieDataTendenciaCrescimento = [
    { name: 'Excelente', population: 50, color: '#879C5F', legendFontColor: '#444', legendFontSize: 14 },
    { name: 'Boa', population: 20, color: '#B4C297', legendFontColor: '#444', legendFontSize: 14 },
    { name: 'Média', population: 20, color: '#61743D', legendFontColor: '#444', legendFontSize: 14 },
    { name: 'Ruim', population: 10, color: '#3C4C27', legendFontColor: '#444', legendFontSize: 14 },
  ];

  // Gráfico 4: Total Colhido (cores #830533 #AE5877 #B6295C #B70A49)
  const pieDataTotalColhido = [
    { name: 'Excelente', population: 45, color: '#830533', legendFontColor: '#444', legendFontSize: 14 },
    { name: 'Boa', population: 30, color: '#AE5877', legendFontColor: '#444', legendFontSize: 14 },
    { name: 'Média', population: 15, color: '#B6295C', legendFontColor: '#444', legendFontSize: 14 },
    { name: 'Ruim', population: 10, color: '#B70A49', legendFontColor: '#444', legendFontSize: 14 },
  ];

  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Dashboard</Text>

      <View style={styles.square}>
        <Text style={styles.chartTitle}>Qualidade de Colheita</Text>
        <PieChart
          data={pieDataQualidadeColheita}
          width={squareWidth}
          height={squareHeight}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      </View>

      <View style={styles.square}>
        <Text style={styles.chartTitle}>Colheita da Semana</Text>
        <PieChart
          data={pieDataColheitaSemana}
          width={squareWidth}
          height={squareHeight}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      </View>

      <View style={styles.square}>
        <Text style={styles.chartTitle}>Tendência de Crescimento</Text>
        <PieChart
          data={pieDataTendenciaCrescimento}
          width={squareWidth}
          height={squareHeight}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      </View>

      <View style={styles.square}>
        <Text style={styles.chartTitle}>Total Colhido</Text>
        <PieChart
          data={pieDataTotalColhido}
          width={squareWidth}
          height={squareHeight}
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
    backgroundColor: '#ece2d6',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#b70a49',
    marginBottom: 16,
    alignSelf: 'center',
  },
  square: {
    width: squareWidth,
    height: squareHeight + 40,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingTop: 12,
    paddingHorizontal: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
    alignItems: 'center',
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 10,
    textAlign: 'center',
  },
});
