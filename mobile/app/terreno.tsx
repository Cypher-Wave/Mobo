import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function TerrenoScreen() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Parte superior - Fundo verde e imagem */}
      <View style={styles.topSection}>
        <Image
          source={require('../assets/images/terrenoImg.png')} // substitua pelo nome correto da imagem que você tiver
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
          onPress={() => router.push('/cadastroTerreno')}
        >
          <Text style={styles.primaryButtonText}>Realizar Cadastro</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={() => router.back()}>
          <Text style={styles.secondaryButtonText}>Mais Tarde</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/terrenoCadastrado')}>
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
  },
  image: {
    width: 250,
    height: 250,
  },
  bottomSection: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 40,
  },
  title: {
    color: '#B70A49',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    color: '#3B3B3B',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  primaryButton: {
    backgroundColor: '#617D3D',
    width: '85%',
    paddingVertical: 14,
    borderRadius: 30,
    marginBottom: 12,
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  secondaryButton: {
    backgroundColor: '#F5EDE2',
    borderWidth: 2,
    borderColor: '#D9CFC0',
    width: '85%',
    paddingVertical: 14,
    borderRadius: 30,
    marginBottom: 15,
  },
  secondaryButtonText: {
    color: '#3B3B3B',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
  linkText: {
    color: '#B70A49',
    fontWeight: '600',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
