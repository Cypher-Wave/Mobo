import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function HomeScreen(): JSX.Element {
  const [search, setSearch] = useState<string>('');
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Cabeçalho */}
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeText}>
              Olá <Text style={styles.bold}>Usuário!</Text>
            </Text>
            <Text style={styles.subtitle}>
              Seja bem-vindo à Mobo, seu gestor de colheita :)
            </Text>
          </View>

          <TouchableOpacity onPress={() => router.push('/perfil')}>
            <Image
              source={require('../assets/images/avisos.png')}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>

        {/* Barra de Pesquisa */}
        <View style={styles.searchBar}>
          <Feather name="search" size={20} color="#b70a49" />
          <TextInput
            style={styles.searchInput}
            placeholder="Pesquisar..."
            placeholderTextColor="#b70a49"
            value={search}
            onChangeText={setSearch}
            returnKeyType="search"
          />
        </View>

        {/* Botões principais */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.mainButtonsContainer}
        >
          <TouchableOpacity
            style={styles.buttonCard}
            onPress={() => router.push('/alertas')}
          >
            <Image
              source={require('../assets/images/iconaviso.png')}
              style={styles.buttonImage}
            />
            <Text style={styles.buttonText}>Alertas</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonCard}
            onPress={() => router.push('/alertas')}
          >
            <Image
              source={require('../assets/images/iconaviso.png')}
              style={styles.buttonImage}
            />
            <Text style={styles.buttonText}>jjfjfj</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonCard}
            onPress={() => router.push('/alertas')}
          >
            <Image
              source={require('../assets/images/iconaviso.png')}
              style={styles.buttonImage}
            />
            <Text style={styles.buttonText}>lllllll</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonCard}
            onPress={() => router.push('/alertas')}
          >
            <Image
              source={require('../assets/images/iconaviso.png')}
              style={styles.buttonImage}
            />
            <Text style={styles.buttonText}>Aloolertas</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonCard}
            onPress={() => router.push('/previsao-de-colheita')}
          >
            <Image
              source={require('../assets/images/iconaviso.png')}
              style={styles.buttonImage}
            />
            <Text style={styles.buttonText}>Previsão{'\n'}Colheita</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonCard}
            onPress={() => router.push('/sensores')}
          >
            <Image
              source={require('../assets/images/iconaviso.png')}
              style={styles.buttonImage}
            />
            <Text style={styles.buttonText}>Sensores</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Card de Clima */}
        <View style={styles.weatherCard}>
          <View style={styles.weatherHeader}>
            <View style={styles.weatherInfo}>
              <Feather name="calendar" size={16} color="#fff" />
              <Text style={styles.weatherHeaderText}>Ter. 20 de Maio</Text>
            </View>
            <View style={styles.weatherInfo}>
              <Feather name="clock" size={16} color="#fff" />
              <Text style={styles.weatherHeaderText}>19:30pm</Text>
            </View>
          </View>

          <View style={styles.weatherBottom}>
            <View style={[styles.weatherTempBox, { backgroundColor: '#ffb84a' }]}>
              <Text style={styles.tempText}>29°</Text>
              <View style={styles.divider} />
              <Text style={styles.cityText}>Registro - SP</Text>
            </View>

            <Image
              source={require('../assets/images/avisos.png')}
              style={styles.weatherIcon}
            />
          </View>
        </View>

        {/* Seção Curiosidades */}
        <Text style={styles.sectionTitle}>Curiosidades</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.curiositiesContainer}
        >
          {/* Coluna 1 */}
          <View style={styles.column}>
            <View style={styles.curiosityCard}>
              <Image
                source={require('../assets/images/avisos.png')}
                style={styles.curiosityImage}
              />
              <Text style={styles.curiosityTitle}>5 curiosidades sobre a Lichia</Text>
              <View style={styles.cardFooter}>
                <Feather name="heart" size={16} color="#fff" />
                <Text style={styles.footerText}>Favoritos</Text>
                <Feather name="eye" size={16} color="#fff" style={{ marginLeft: 16 }} />
                <Text style={styles.footerText}>Visualizações</Text>
              </View>
            </View>

            <View style={styles.curiosityCard}>
              <Image
                source={require('../assets/images/avisos.png')}
                style={styles.curiosityImage}
              />
              <Text style={styles.curiosityTitle}>Benefícios da Lichia para saúde</Text>
              <View style={styles.cardFooter}>
                <Feather name="heart" size={16} color="#fff" />
                <Text style={styles.footerText}>Favoritos</Text>
                <Feather name="eye" size={16} color="#fff" style={{ marginLeft: 16 }} />
                <Text style={styles.footerText}>Visualizações</Text>
              </View>
            </View>

            <View style={styles.curiosityCard}>
              <Image
                source={require('../assets/images/avisos.png')}
                style={styles.curiosityImage}
              />
              <Text style={styles.curiosityTitle}>Como a lichia é cultivada</Text>
              <View style={styles.cardFooter}>
                <Feather name="heart" size={16} color="#fff" />
                <Text style={styles.footerText}>Favoritos</Text>
                <Feather name="eye" size={16} color="#fff" style={{ marginLeft: 16 }} />
                <Text style={styles.footerText}>Visualizações</Text>
              </View>
            </View>
          </View>

          {/* Coluna 2 */}
          <View style={styles.column}>
            <View style={styles.curiosityCard}>
              <Image
                source={require('../assets/images/avisos.png')}
                style={styles.curiosityImage}
              />
              <Text style={styles.curiosityTitle}>História da lichia no Brasil</Text>
              <View style={styles.cardFooter}>
                <Feather name="heart" size={16} color="#fff" />
                <Text style={styles.footerText}>Favoritos</Text>
                <Feather name="eye" size={16} color="#fff" style={{ marginLeft: 16 }} />
                <Text style={styles.footerText}>Visualizações</Text>
              </View>
            </View>

            <View style={styles.curiosityCard}>
              <Image
                source={require('../assets/images/avisos.png')}
                style={styles.curiosityImage}
              />
              <Text style={styles.curiosityTitle}>Lichia e sustentabilidade</Text>
              <View style={styles.cardFooter}>
                <Feather name="heart" size={16} color="#fff" />
                <Text style={styles.footerText}>Favoritos</Text>
                <Feather name="eye" size={16} color="#fff" style={{ marginLeft: 16 }} />
                <Text style={styles.footerText}>Visualizações</Text>
              </View>
            </View>

            <View style={styles.curiosityCard}>
              <Image
                source={require('../assets/images/avisos.png')}
                style={styles.curiosityImage}
              />
              <Text style={styles.curiosityTitle}>Como preparar receitas com lichia</Text>
              <View style={styles.cardFooter}>
                <Feather name="heart" size={16} color="#fff" />
                <Text style={styles.footerText}>Favoritos</Text>
                <Feather name="eye" size={16} color="#fff" style={{ marginLeft: 16 }} />
                <Text style={styles.footerText}>Visualizações</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2e5d5',
    paddingHorizontal: 18,
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  welcomeText: {
    fontSize: 22,
    color: '#3b3b3b',
  },
  bold: {
    fontWeight: 'bold',
    color: '#b70a49',
  },
  subtitle: {
    fontSize: 14,
    color: '#5a5a5a',
  },
  profileImage: {
    width: 55,
    height: 55,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#b70a49',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#b70a49',
    borderWidth: 2,
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 48,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    color: '#3b3b3b',
  },
  mainButtonsContainer: {
    flexDirection: 'row',
    gap: 15,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  buttonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    width: 200,
    height: 80,
    borderWidth: 2,
    borderColor: '#b70a49',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  buttonImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginRight: 10,
  },
  buttonText: {
    color: '#b70a49',
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'left',
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#3b3b3b',
    marginTop: 25,
    marginBottom: 10,
  },
  weatherCard: {
    backgroundColor: '#b70a49',
    borderRadius: 20,
    padding: 16,
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  weatherHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  weatherInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  weatherHeaderText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  weatherBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  weatherTempBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  tempText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginRight: 8,
  },
  divider: {
    width: 1.5,
    height: 25,
    backgroundColor: '#fff',
    marginHorizontal: 8,
  },
  cityText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  weatherIcon: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },

  // Curiosidades
  curiositiesContainer: {
    flexDirection: 'row',
    paddingHorizontal: 5,
  },
  column: {
    flexDirection: 'column',
    marginRight: 15,
  },
  curiosityCard: {
    backgroundColor: '#3b3b3b',
    borderRadius: 18,
    width: 240,
    marginBottom: 15,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
  },
  curiosityImage: {
    width: '100%',
    height: 100,
    borderRadius: 12,
  },
  curiosityTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 8,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  footerText: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 5,
  },
});
