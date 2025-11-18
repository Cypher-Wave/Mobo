import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Livvic_400Regular,
  Livvic_500Medium,
  Livvic_700Bold,
} from '@expo-google-fonts/livvic';

export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    Livvic_400Regular,
    Livvic_500Medium,
    Livvic_700Bold,
  });

  if (!fontsLoaded) return <AppLoading />;

  const curiosities = [
    {
      title: '5 curiosidades sobre a Lichia',
      image: require('../assets/images/curiosidadesImg1.png'),
      route: '/curiosidades',
    },
    {
      title: 'Benefícios da Lichia',
      image: require('../assets/images/curiosidadesImg2.png'),
      route: '/curiosidades',
    },
    {
      title: 'Como a Lichia é cultivada',
      image: require('../assets/images/curiosidadesImg3.png'),
      route: '/curiosidades',
    },
    {
      title: 'Receitas com Lichia',
      image: require('../assets/images/curiosidadesImg4.png'),
      route: '/curiosidades',
    },
  ];

  const actions = [
    { icon: 'alert-triangle', text: 'Alertas', route: '/alertas' },
    { icon: 'calendar', text: 'Previsão', route: '/previsao-de-colheita' },
    { icon: 'activity', text: 'Sensores', route: '/sensores' },
    { icon: 'award', text: 'Braço Mecânico', route: '/garra' },
    { icon: 'book-open', text: 'Curiosidades', route: '/curiosidades' },
    { icon: 'settings', text: 'Dashboard', route: '/dashboard' },
  ];

  const handleNavigation = (route: string) => {
    try {
      if (route) router.push(route as any);
    } catch (error) {
      console.log('Erro ao navegar:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container as ViewStyle}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Cabeçalho */}
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeText}>
              Olá, <Text style={styles.bold}>Usuário!</Text>
            </Text>
            <Text style={styles.subtitle}>Seja bem-vindo à Mobo 🌱</Text>
          </View>

          <TouchableOpacity onPress={() => handleNavigation('/perfil')}>
            <Image
              source={require('../assets/images/perfilFoto.png')}
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
          />
        </View>

        {/* Card de Clima / Alertas */}
        <Text style={styles.sectionTitle}>Alertas</Text>

        <View style={styles.weatherCard}>
          <View style={styles.weatherContent}>
            <View style={styles.weatherTextContainer}>
              <Text style={styles.weatherText}>Terça, 20 de Maio | 19:30</Text>
              <Text style={styles.tempText}>29°C | Registro SP</Text>
            </View>
            <Image
              source={require('../assets/images/imgAlertas.png')}
              style={styles.alertImage}
            />
          </View>
        </View>

        {/* Ferramentas */}
        <Text style={styles.sectionTitle}>Ferramentas</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.actionScroll}
        >
          {actions.map((item, index) => (
            <TouchableOpacity
              key={item.route ?? index}
              activeOpacity={0.8}
              style={styles.actionButton}
              onPress={() => handleNavigation(item.route)}
            >
              <View style={styles.iconTextContainer}>
                <Feather
                  name={item.icon as any}
                  size={32}
                  color="#b70a49"
                  style={styles.iconShadow}
                />
                <Text style={styles.actionText}>{item.text}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Curiosidades */}
        <Text style={styles.sectionTitle}>Curiosidades</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.curiosityScroll}
        >
          {curiosities.map((item, index) => (
            <View key={index} style={styles.curiosityCard}>
              <Image source={item.image} style={styles.curiosityImage} />
              <Text style={styles.curiosityTitle}>{item.title}</Text>
              <View style={styles.cardFooter}>
                <Feather
                  name="heart"
                  size={22}
                  color="#3C4C27"
                  style={{ marginTop: 10 }}
                />
                <Text style={styles.footerText}>Favoritos</Text>
                <Feather
                  name="eye"
                  size={22}
                  color="#3C4C27"
                  style={{ marginLeft: 16, marginTop: 10 }}
                />
                <Text style={styles.footerText}>Visualizações</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}

type Styles = {
  container: ViewStyle;
  header: ViewStyle;
  welcomeText: TextStyle;
  bold: TextStyle;
  subtitle: TextStyle;
  profileImage: ImageStyle;
  searchBar: ViewStyle;
  searchInput: TextStyle;
  weatherCard: ViewStyle;
  weatherContent: ViewStyle;
  weatherTextContainer: ViewStyle;
  weatherText: TextStyle;
  tempText: TextStyle;
  alertImage: ImageStyle;
  sectionTitle: TextStyle;
  actionScroll: ViewStyle;
  actionButton: ViewStyle;
  iconTextContainer: ViewStyle;
  iconShadow: TextStyle;
  actionText: TextStyle;
  curiosityScroll: ViewStyle;
  curiosityCard: ViewStyle;
  curiosityImage: ImageStyle;
  curiosityTitle: TextStyle;
  cardFooter: ViewStyle;
  footerText: TextStyle;
};

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    backgroundColor: '#f5e9da',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
  },
  welcomeText: {
    fontSize: 22,
    color: '#3b3b3b',
    fontFamily: 'Livvic_500Medium',
  },
  bold: {
    fontFamily: 'Livvic_700Bold',
    color: '#b70a49',
  },
  subtitle: {
    fontSize: 14,
    color: '#5a5a5a',
    fontFamily: 'Livvic_400Regular',
  },
  profileImage: {
    width: 65,
    height: 65,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#b70a49',
    marginRight: 30,
    marginTop: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#b70a49',
    borderBottomWidth: 5,
    borderWidth: 1.5,
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 45,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
    marginBottom: 25,
    width: '90%',
    marginLeft: 28,
    marginTop: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    color: '#3b3b3b',
    fontFamily: 'Livvic_400Regular',
  },
  weatherCard: {
    backgroundColor: '#b70a49',
    borderRadius: 28,
    padding: 18,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 6,
    marginBottom: 35,
    marginTop: 10,
    width: '90%',
    marginLeft: 30,
    borderWidth: 3,
    borderColor: '#72002A',
    borderBottomWidth: 8,
  },
  weatherContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  weatherTextContainer: { flex: 1 },
  weatherText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Livvic_500Medium',
    marginBottom: 18,
  },
  tempText: {
    color: '#fff',
    fontSize: 22,
    fontFamily: 'Livvic_700Bold',
    backgroundColor: '#D59043',
    borderRadius: 40,
    paddingVertical: 18,
    paddingHorizontal: 65,
    alignSelf: 'center',
    borderWidth: 3,
    borderColor: '#5C1D00',
    borderBottomWidth: 6,
    textAlign: 'center',
    minWidth: 360,
  },
  alertImage: {
    position: 'absolute',
    width: 150,
    height: 120,
    resizeMode: 'contain',
    top: '50%',
    left: '50%',
    transform: [{ translateX: 70 }, { translateY: -60 }],
    zIndex: 2,
  },
  sectionTitle: {
    fontFamily: 'Livvic_700Bold',
    fontSize: 18,
    color: '#3b3b3b',
    marginBottom: 10,
  },
  actionScroll: {
    flexDirection: 'row',
    paddingBottom: 20,
  },
  actionButton: {
    width: 190,
    height: 100,
    backgroundColor: '#fff',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#b70a49',
    borderBottomWidth: 5,
    borderBottomColor: '#ff4f8b',
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginBottom: 15,
    marginTop: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconShadow: {
    textShadowColor: 'rgba(183, 10, 73, 0.4)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
    marginRight: 8,
  },
  actionText: {
    color: '#b70a49',
    fontFamily: 'Livvic_700Bold',
    fontSize: 18,
    textAlign: 'center',
  },
  curiosityScroll: {
    flexDirection: 'row',
    paddingBottom: 25,
  },
  curiosityCard: {
    backgroundColor: '#61743D',
    borderRadius: 18,
    width: 270,
    height: 240,
    marginRight: 15,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    marginTop: 10,
  },
  curiosityImage: {
    width: '100%',
    height: 130,
    borderRadius: 12,
    borderWidth: 4,
    borderColor: '#fff',
  },
  curiosityTitle: {
    color: '#fff',
    fontFamily: 'Livvic_700Bold',
    fontSize: 15,
    marginTop: 8,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  footerText: {
    color: '#3C4C27',
    fontSize: 15,
    marginLeft: 5,
    fontFamily: 'Livvic_500Medium',
    marginTop: 10,
  },
});
