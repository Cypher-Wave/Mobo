import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  useFonts,
  Livvic_400Regular,
  Livvic_600SemiBold,
  Livvic_700Bold,
} from '@expo-google-fonts/livvic';
import { useNavigation } from '@react-navigation/native'; // ⬅ import necessário

export default function CadastroTerreno() {
  const navigation = useNavigation(); // ⬅ hook do navigation
  const [fontsLoaded] = useFonts({
    Livvic_400Regular,
    Livvic_600SemiBold,
    Livvic_700Bold,
  });

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
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

        <Text style={styles.sectionTitle}>Dados do Terreno:</Text>

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

        <TouchableOpacity
          style={styles.button}
        >
          <Text style={styles.buttonText}>Cadastrar Terreno</Text>
        </TouchableOpacity>

    
        <TouchableOpacity style={styles.button2}>
          <Text style={styles.buttonText2}>Já possuo cadastro</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5E9DC',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 40,
    paddingBottom: 0,
  },

  title: {
    fontSize: 24,
    color: '#A9003F',
    fontFamily: 'Livvic_700Bold',
  },

  formContainer: {
    backgroundColor: '#617D3D',
    width: '95%',
    minHeight: '85%',
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },

  sectionTitle: {
    color: '#F5E9DC',
    fontSize: 18,
    fontFamily: 'Livvic_700Bold',
    marginBottom: 20,
    marginTop: 10,
  },

  input: {
    width: '100%',
    backgroundColor: '#748F53',
    borderRadius: 15,
    paddingVertical: 12,
    marginBottom: 12,
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Livvic_600SemiBold',
    textAlign: 'center',
    elevation: 3,
  },

  button: {
    backgroundColor: '#F5E9DC',
    borderRadius: 20,
    marginTop: 80,
    paddingVertical: 12,
    paddingHorizontal: 40,
    elevation: 4,
  },

  buttonText: {
    color: '#3B3B3B',
    fontFamily: 'Livvic_700Bold',
    fontSize: 16,
  },

  button2: {
    backgroundColor: '#617D3D',
    borderRadius: 20,
    marginTop: 25,
    paddingVertical: 12,
    paddingHorizontal: 40,
    elevation: 4,
    borderWidth: 2,
    borderColor: '#F5E9DC',
  },

  buttonText2: {
    color: '#F5E9DC',
    fontFamily: 'Livvic_700Bold',
    fontSize: 16,
  },
});
