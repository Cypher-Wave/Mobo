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
  const [conta, setConta] = useState('');
  const [telefone, setTelefone] = useState('');
  const [imagem, setImagem] = useState('');
  const [cpf, setCpf] = useState('');
  const [dap, setDap] = useState('');

  const router = useRouter();

  return (
    <ImageBackground
      source={require('../assets/images/Login.png')}
      style={styles.background}
    >
      <View style={styles.overlay}>
        {/* Logo */}
        <Image
          source={require('../assets/images/logoMobo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Título */}
        <Text style={styles.title}>Crie sua conta</Text>

        {/* Inputs */}
        <View style={styles.inputContainer}>
          <Feather name="user" size={20} color="#b70a49" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Nome completo"
            placeholderTextColor="#555"
            value={nome}
            onChangeText={setNome}
          />
        </View>

        <View style={styles.inputContainer}>
          <Feather name="mail" size={20} color="#b70a49" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="E-mail"
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

        <View style={styles.inputContainer}>
          <Feather name="users" size={20} color="#b70a49" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Escolha uma conta"
            placeholderTextColor="#555"
            value={conta}
            onChangeText={setConta}
          />
        </View>

        <View style={styles.inputContainer}>
          <Feather name="phone" size={20} color="#b70a49" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Telefone"
            placeholderTextColor="#555"
            keyboardType="phone-pad"
            value={telefone}
            onChangeText={setTelefone}
          />
        </View>

        <View style={styles.inputContainer}>
          <Feather name="image" size={20} color="#b70a49" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Escolha uma imagem"
            placeholderTextColor="#555"
            value={imagem}
            onChangeText={setImagem}
          />
        </View>

        <View style={styles.inputContainer}>
          <Feather name="id-card" size={20} color="#b70a49" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="CPF"
            placeholderTextColor="#555"
            keyboardType="numeric"
            value={cpf}
            onChangeText={setCpf}
          />
        </View>

        <View style={styles.inputContainer}>
          <Feather name="file-text" size={20} color="#b70a49" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="DAP"
            placeholderTextColor="#555"
            value={dap}
            onChangeText={setDap}
          />
        </View>

        {/* Botão principal */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/terreno')}
        >
          <Text style={styles.buttonText}>CADASTRAR-SE</Text>
        </TouchableOpacity>

        {/* Link para login */}
        <TouchableOpacity onPress={() => router.push('/login')}>
          <Text style={styles.linkText}>Já possuo uma conta</Text>
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
    backgroundColor: 'rgba(0, 34, 0, 0.45)',
  },
  logo: {
    width: 240,
    height: 120,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 8,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
    borderWidth: 2,
    borderColor: '#b70a49',
    borderRadius: 30,
    width: '90%',
    paddingHorizontal: 15,
    marginBottom: 12,
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
