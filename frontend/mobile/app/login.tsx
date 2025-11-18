import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function CadastroScreen() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const router = useRouter();

  return (
    <ImageBackground
      source={require('../assets/images/Login.png')}
      style={styles.background}
    >
      <View style={styles.overlay}>
        {/* Logo com sombra */}
        <Image
          source={require('../assets/images/logoMobo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Título */}
        <Text style={styles.title}>Deseja criar uma conta?</Text>

        {/* Campos de entrada */}
        <View style={styles.inputContainer}>
          <Feather name="user" size={20} color="#b70a49" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Nome"
            placeholderTextColor="#555"
            value={nome}
            onChangeText={setNome}
          />
        </View>

        <View style={styles.inputContainer}>
          <Feather name="mail" size={20} color="#b70a49" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#555"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputContainer}>
          <Feather name="lock" size={20} color="#b70a49" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#555"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />
        </View>

        {/* Botão principal */}
        <TouchableOpacity style={styles.button} onPress={() => router.push('/terreno')}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        {/* Link */}
        <TouchableOpacity onPress={() => router.push('/cadastro')}>
          <Text style={styles.linkText}>Realizar Cadastro!</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,

    // 💚 Fundo mais escuro com "gradiente" verde simulado
    backgroundColor: 'rgba(0, 34, 0, 0.4)', // base escura esverdeada
    backgroundImage:
      'linear-gradient(rgba(0, 62, 0, 0.68), rgba(0,0,0,0.7))', // degrade do verde para o preto
  },
  logo: {
    width: 240,
    height: 120,
    marginBottom: 20,
    // 💡 Sombra da logo
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 8,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.54)', // branco com 80% de opacidade
    borderWidth: 2,
    borderColor: '#b70a49',
    borderRadius: 30,
    width: '90%',
    paddingHorizontal: 15,
    marginBottom: 15,
    height: 50,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#000',
    fontSize: 15,
  },
  button: {
    backgroundColor: '#b70a49',
    width: '90%',
    paddingVertical: 14,
    borderRadius: 30,
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  linkText: {
    color: '#fff',
    fontSize: 14,
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});
