import React, { useState } from 'react';
import { Image } from 'expo-image';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

import { HelloWave } from '@/components/hello-wave';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link, useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const botoes = [
    { label: 'Dashboard', rota: '/dashboard', icon: 'bar-chart-2' },
    { label: 'Previsão de Colheita', rota: '/previsao-de-colheita', icon: 'cloud-rain' },
    { label: 'Garra', rota: '/garra', icon: 'cpu' },
    { label: 'Curiosidades', rota: '/curiosidades', icon: 'book-open' },
    { label: 'Relatórios', rota: '/relatorios', icon: 'file-text' },
    { label: 'Alertas', rota: '/alertas', icon: 'alert-triangle' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="handled">
        {/* Cabeçalho */}
        <View style={styles.header}>
          <ThemedText type="title" style={styles.welcomeText}>
            Bem-vindo
          </ThemedText>

          <TouchableOpacity
            onPress={() => router.push('/perfil')}
            style={styles.profileContainer}
          >
            <Image
              source={require('../../assets/images/imgcamera.png')}
              style={styles.profileImage}
              contentFit="cover"
            />
          </TouchableOpacity>
        </View>

        {/* Barra de Pesquisa */}
        <View style={styles.searchContainer}>
          <Feather
            name="search"
            size={20}
            color="#b70a49"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Pesquisar..."
            value={search}
            onChangeText={setSearch}
            returnKeyType="search"
            onSubmitEditing={() => {
              console.log('Buscando:', search);
            }}
            clearButtonMode="while-editing"
          />
        </View>

        {/* Botões com ícones */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.buttonScroll}
        >
          {botoes.map((btn, index) => (
            <Link key={index} href={btn.rota} style={styles.button}>
              <Feather name={btn.icon} size={22} color="#fff" style={styles.buttonIcon} />
              <Text style={styles.buttonText}>{btn.label}</Text>
            </Link>
          ))}
        </ScrollView>

        {/* Dica */}
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Dica:</ThemedText>
          <ThemedText>Use o menu ☰ no topo para navegar entre telas.</ThemedText>
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ece2d6',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
  },
  welcomeText: {
    fontWeight: 'bold',
  },
  profileContainer: {
    width: 74,
    height: 74,
    borderRadius: 52,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#b70a49',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },

  searchContainer: {
    width: 500,
    alignSelf: 'center',
    marginBottom: 70,
    borderRadius: 90,
    borderWidth: 2,
    borderBottomWidth: 5,
    borderColor: '#b70a49',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    backgroundColor: 'transparent',
    borderWidth: 0,
    paddingRight: 20,
  },

  buttonScroll: {
    paddingHorizontal: 12,
    marginBottom: 24,
  },

  button: {
    flexDirection: 'row',
    backgroundColor: '#b70a49',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 30,
    marginRight: 12,
    minWidth: 180,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },

  buttonIcon: {
    marginRight: 6,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
});
