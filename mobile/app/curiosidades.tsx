import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useFonts, Livvic_400Regular, Livvic_700Bold } from '@expo-google-fonts/livvic';
import AppLoading from 'expo-app-loading';

export default function Curiosidades() {
  const [favorito, setFavorito] = useState(false);
  const [fontsLoaded] = useFonts({
    Livvic_400Regular,
    Livvic_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const toggleFavorito = () => setFavorito(!favorito);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Banner com botão de favoritos */}
      <View style={styles.bannerWrapper}>
        <Image
          source={require('../assets/images/imgcuriosidades1.png')}
          style={styles.banner}
          resizeMode="cover"
        />
        <TouchableOpacity style={styles.favButton} onPress={toggleFavorito}>
          <FontAwesome
            name={favorito ? 'heart' : 'heart-o'}
            size={28}
            color={favorito ? '#B70A49' : 'white'}
          />
        </TouchableOpacity>
      </View>

      {/* Texto da curiosidade */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>Benefícios da lichia para saúde:</Text>
        <Text style={styles.text}>
          A lichia é uma boa fonte de vitamina C, fibras e antioxidantes. Antioxidantes ajudam a combater os radicais livres no corpo, reduzindo o estresse oxidativo e protegendo as células contra danos.
          Vitamina C pode ajudar a fortalecer o sistema imunológico, aumentando a resistência a doenças e infecções.
          Fibras podem ajudar a promover a saúde digestiva, prevenir a constipação e melhorar a regularidade intestinal.
          Hidratação: devido ao seu alto teor de água, a lichia pode ajudar a manter o corpo hidratado e a promover a saúde da pele.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B70A49',
  },
  contentContainer: {
    padding: 16,
    alignItems: 'center',
  },
  bannerWrapper: {
    width: '100%',
    height: 300, // banner maior
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 24,
  },
  banner: {
    width: '100%',
    height: '100%',
  },
  favButton: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 20,
    padding: 6,
  },
  textContainer: {
    width: '100%',
  },
  title: {
    fontSize: 28, // título maior
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
    textAlign: 'center',
    fontFamily: 'Livvic',
  },
  text: {
    fontSize: 18,
    color: 'white',
    lineHeight: 26,
    textAlign: 'justify',
    fontFamily: 'Livvic_400Regular',
  },
});
