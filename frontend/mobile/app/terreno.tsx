import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useFonts, Livvic_400Regular, Livvic_600SemiBold, Livvic_700Bold } from '@expo-google-fonts/livvic';
import AppLoading from 'expo-app-loading';

export default function TerrenoScreen() {
  const router = useRouter();

  // Carrega a fonte Livvic
  const [fontsLoaded] = useFonts({
    Livvic_400Regular,
    Livvic_600SemiBold,
    Livvic_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Parte superior - Fundo verde */}
      <View style={styles.topSection}></View>

      {/* Imagem posicionada fora do fundo verde */}
      <View style={styles.imageWrapper}>
        <Image
          source={require('../assets/images/terrenoImg.png')} // substitua pelo nome correto da imagem
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      {/* Conteúdo inferior */}
      <View style={styles.bottomSection}>
        <Text style={styles.title}>Deseja cadastrar seu terreno?</Text>
        <Text style={styles.subtitle}>
          Você precisa cadastrar o terreno para ter acesso às configurações do braço mecânico!
        </Text>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => router.push('/terrenoCadastrado')}
        >
          <Text style={styles.primaryButtonText}>Realizar Cadastro</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={() => router.back()}>
          <Text style={styles.secondaryButtonText}>Mais Tarde</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/login')}>
          <Text style={styles.linkText}>já possuo terreno cadastrado</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F5EDE2',
  },
  topSection: {
    backgroundColor: '#617D3D',
    height: 320,
    borderBottomLeftRadius: 400,
    borderBottomRightRadius: 400,
    width: '120%',
    alignSelf: 'center',
    marginLeft: -20,
  },
  imageWrapper: {
    alignItems: 'center',
    marginTop: -230,
  },
  image: {
    width: 420,
    height: 330,
    marginBottom: 20,
  },
  bottomSection: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 40,
  },
  title: {
    color: '#B70A49',
    fontSize: 25,
    fontFamily: 'Livvic_700Bold',
    textAlign: 'center',
    marginBottom: 40,
  },
 subtitle: {
  color: '#3B3B3B',
  fontSize: 20,
  fontFamily: 'Livvic_600SemiBold', // agora está em negrito
  textAlign: 'center',
  marginBottom: 30,
  lineHeight: 32,
},

  primaryButton: {
    backgroundColor: '#617D3D',
    width: '70%',
    paddingVertical: 14,
    borderRadius: 30,
    marginBottom: 22,
    marginTop:20,
  },
  primaryButtonText: {
    color: '#fff',
    fontFamily: 'Livvic_700Bold',
    fontSize: 16,
    textAlign: 'center',
  },
  secondaryButton: {
    backgroundColor: '#F5EDE2',
    borderWidth: 4,
    borderColor: '#D9CFC0',
    width: '70%',
    paddingVertical: 14,
    borderRadius: 30,
    marginBottom: 25,
  },
  secondaryButtonText: {
    color: '#3B3B3B',
    fontFamily: 'Livvic_600SemiBold',
    fontSize: 16,
    textAlign: 'center',
  },
  linkText: {
    color: '#B70A49',
    fontFamily: 'Livvic_600SemiBold',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
