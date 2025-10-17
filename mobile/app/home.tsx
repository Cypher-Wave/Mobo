import React, { useState } from 'react';
import { Image as ExpoImage } from 'expo-image';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, useRouter } from 'expo-router';

import { Feather } from '@expo/vector-icons';

export default function HomeScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');

  // Agora o array botoes tem apenas o ícone, sem a imagem
 // 👇 parte do array botoes
const botoes = [
  { label: 'Dashboard', rota: '/dashboard', icon: 'grid' },
  { label: 'Previsão de Colheita', rota: '/previsao-de-colheita', icon: 'cloud-snow' },
  { label: 'Garra', rota: '/garra', icon: 'anchor' },
  { label: 'Curiosidades', rota: '/curiosidades', icon: 'book' },
  { label: 'Relatórios', rota: '/relatorios', icon: 'file-text' },
  { label: 'Alertas', rota: '/alertas', icon: 'alert-triangle' },
  { label: 'Sensores', rota: '/sensores', icon: 'cpu' },
];

  const cards = [
    { title: 'Sensores', rota: '/sensores', image: require('../assets/images/imgcamera.png') },
    { title: 'Relatórios', rota: '/relatorios', image: require('../assets/images/imgcamera.png') },
    { title: 'Previsão', rota: '/previsao', image: require('../assets/images/imgcamera.png') },
    { title: 'Alertas', rota: '/alertas', image: require('../assets/images/imgcamera.png') },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.scrollContainer}>
        
        {/* Cabeçalho */}
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Bem-vindo</Text>
          <TouchableOpacity onPress={() => router.push('/perfil')} style={styles.profileContainer}>
            <ExpoImage
              source={require('../assets/images/imgcamera.png')}
              style={styles.profileImage}
              contentFit="cover"
            />
          </TouchableOpacity>
        </View>

        {/* Barra de Pesquisa */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Pesquisar..."
            placeholderTextColor="#aaa"
            value={search}
            onChangeText={setSearch}
            returnKeyType="search"
            onSubmitEditing={() => console.log('Buscando:', search)}
            clearButtonMode="while-editing"
          />
        </View>

        {/* Botões com ícones (substituindo imagens) */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.buttonScroll}
        >
          {botoes.map((btn, index) => (
            <Link key={index} href={btn.rota} style={styles.button}>
              <Feather name={btn.icon} size={40} color="#b70a49" style={{ marginBottom: 10 }} />
              <Text style={styles.buttonText}>{btn.label}</Text>
            </Link>
          ))}
        </ScrollView>

        {/* Título da Previsão */}
        <Text style={styles.sectionTitle}>Previsão do Tempo</Text>

        {/* Previsão do Tempo (continua com imagem) */}
        <View style={styles.weatherCard}>
          <ExpoImage
            source={require('../assets/images/imgcamera.png')}
            style={{ width: 50, height: 50 }}
            contentFit="cover"
          />
          <View>
            <Text style={styles.weatherTemp}>27°C</Text>
            <Text style={styles.weatherLocation}>Registro - SP</Text>
          </View>
        </View>

        {/* Título dos Cards */}
        <Text style={styles.sectionTitle}>Serviços Disponíveis</Text>

        {/* Cards (mantém imagens) */}
        <View style={styles.cardsContainer}>
          {cards.map((card, index) => (
            <Link key={index} href={card.rota} style={styles.card}>
              <ExpoImage
                source={card.image}
                style={styles.cardImage}
                contentFit="cover"
              />
              <Text style={styles.cardText}>{card.title}</Text>
            </Link>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

// Mantive seu styles original
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ece2d6',
    fontFamily: 'Livvic',
  },
  scrollContainer: {
    paddingBottom: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'Livvic',
    color: '#333',
  },
  profileContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#b70a49',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },

  searchContainer: {
    width: '80%',
    alignSelf: 'center',
    marginBottom: 30,
    marginTop: 30,
    borderRadius: 30,
    borderWidth: 2,
    borderBottomWidth: 4,
    borderColor: '#b70a49',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    color:'#b70a49'
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    fontFamily: 'Livvic',
    color:'#b70a49'
  },

  buttonScroll: {
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#fff',
    borderBottomWidth: 4,
    borderColor: '#b70a49',
    borderWidth: 2,
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    width: 140,
    height: 110,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  buttonText: {
    fontFamily: 'Livvic',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#b70a49',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Livvic',
    color: '#0000',
    marginLeft: 24,
    marginBottom: 12,
  },

  weatherCard: {
    width:'80%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#b70a49',
    marginHorizontal: '10%',
    marginBottom: 40,
    padding: 34,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    gap: 20,
  },
  weatherTemp: {
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'Livvic',
    color: '#fff',
  },
  weatherLocation: {
    fontSize: 16,
    fontFamily: 'Livvic',
    color: '#fff',
  },

  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingHorizontal: 12,
  },
  card: {
    width: '45%',
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Livvic',
    color: '#333',
    textAlign: 'center',
  },
});
