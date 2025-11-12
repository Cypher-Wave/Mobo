import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {
  useFonts,
  Livvic_400Regular,
  Livvic_600SemiBold,
  Livvic_700Bold,
} from '@expo-google-fonts/livvic';

export default function CadastroTerreno() {
  const [fontsLoaded] = useFonts({
    Livvic_400Regular,
    Livvic_600SemiBold,
    Livvic_700Bold,
  });

  if (!fontsLoaded) return null;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Cadastro de Terreno</Text>

      <View style={styles.formContainer}>
        <Text style={styles.sectionTitle}>Dados do Proprietário:</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome completo ou razão social"
          placeholderTextColor="#F5E9DC"
        />
        <TextInput
          style={styles.input}
          placeholder="CPF ou CNPJ"
          placeholderTextColor="#F5E9DC"
        />
        <TextInput
          style={styles.input}
          placeholder="Endereço completo (incluindo CEP)"
          placeholderTextColor="#F5E9DC"
        />
        <TextInput
          style={styles.input}
          placeholder="Telefone"
          placeholderTextColor="#F5E9DC"
        />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#F5E9DC"
        />

        <Text style={[styles.sectionTitle, { marginTop: 30 }]}>
          Dados do Terreno:
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Localização Geográfica"
          placeholderTextColor="#F5E9DC"
        />
        <TextInput
          style={styles.input}
          placeholder="Tipo de Terreno"
          placeholderTextColor="#F5E9DC"
        />
        <TextInput
          style={styles.input}
          placeholder="Área total do Terreno"
          placeholderTextColor="#F5E9DC"
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Cadastrar-se</Text>
        </TouchableOpacity>

         <TouchableOpacity style={styles.button2}>
          <Text style={styles.buttonText}>Já possuo cadastro </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F5E9DC',
    alignItems: 'center',
    paddingVertical: 30,
  },
  title: {
    fontSize: 24,
    color: '#A9003F',
    fontFamily: 'Livvic_700Bold',
    marginBottom: 62,
    marginTop: 13,
  },
  formContainer: {
    backgroundColor: '#617D3D',
    width: '90%',
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  sectionTitle: {
    color: '#F5E9DC',
    fontSize: 18,
    fontFamily: 'Livvic_700Bold',
    marginBottom: 65,
  },
  input: {
    width: '100%',
    backgroundColor: '#748F53',
    borderRadius: 15,
    paddingVertical: 14,
    marginBottom: 15,
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Livvic_600SemiBold',
    textAlign: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  button: {
    backgroundColor: '#F5E9DC',
    borderRadius: 20,
    marginTop: 25,
    paddingVertical: 12,
    paddingHorizontal: 50,
    elevation: 4,
  },
  buttonText: {
    color: '#3B3B3B',
    fontFamily: 'Livvic_700Bold',
    fontSize: 16,
  },
   button2: {
  backgroundColor: 'transparent', // ✅ fundo invisível
    borderRadius: 20,
    marginTop: 25,
    paddingVertical: 12,
    paddingHorizontal: 50,
    elevation: 4,
    borderWidth:2,
    borderColor: '#3C4C27',
  },
});
