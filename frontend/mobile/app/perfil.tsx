import React from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function PerfilScreen() {
  return (
    <ScrollView style={styles.container}>
      
      {/* Fundo com lichias */}
      <ImageBackground
        source={require('../assets/images/fundoPerfil.png')}
        style={styles.imageHeader}
      >
        <TouchableOpacity style={styles.cameraIcon}>
          <Feather name="camera" size={22} color="#fff" />
          <Feather name="plus" size={10} color="#fff" style={styles.plusIcon} />
        </TouchableOpacity>
      </ImageBackground>

      {/* Conteúdo principal */}
      <View style={styles.content}>
        {/* Foto e nome */}
        <Image
          source={require('../assets/images/perfilFoto.png')}
          style={styles.profileImage}
        />
        <Text style={styles.name}>Geovanna Silva</Text>
        <Text style={styles.username}>@Silovageovanna</Text>

        {/* Botão */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Gerar Relatórios</Text>
        </TouchableOpacity>

        {/* Galeria */}
        <Text style={styles.galleryTitle}>Galeria de Fotos-</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.photoCard}>
            <Image
              source={require('../assets/images/imgGaleria1.png')}
              style={styles.photo}
            />
          </View>
            <View style={styles.photoCard}>
            <Image
              source={require('../assets/images/imgGaleria2.png')}
              style={styles.photo}
            />
          </View>
          <View style={styles.photoCard}>
            <Image
              source={require('../assets/images/imgGaleria4.png')}
              style={styles.photo}
            />
          </View>
          <View style={styles.photoCard}>
            <Image
              source={require('../assets/images/imgGaleria3.png')}
              style={styles.photo}
            />
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E7D9CA',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  hora: {
    color: '#b70a49',
    fontWeight: 'bold',
    fontSize: 16,
  },
  iconsRight: {
    flexDirection: 'row',
  },
  iconHeader: {
    marginLeft: 8,
  },
  imageHeader: {
    width: '100%',
    height: 360,
    justifyContent: 'flex-end',
  },
  cameraIcon: {
    position: 'absolute',
    top: 10,
    left: 20,
    backgroundColor: '#b70a49',
    padding: 8,
    borderRadius: 50,
  },
  plusIcon: {
    position: 'absolute',
    right: 4,
    bottom: 2,
  },
  content: {
    alignItems: 'center',
    backgroundColor: '#E7D9CA',
    marginTop: 40,
    paddingBottom: 40,
  },
  profileImage: {
    width: 240,
    height: 240,
    borderRadius: 125,
    borderWidth: 3,
    borderColor: '#fff',
    marginTop: -160,
    marginBottom: 30,

  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 10,
    color: '#000',
  },
  username: {
    color: '#555',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#b70a49',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 25,
    marginBottom: 25,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  galleryTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginBottom: 50,
    marginTop: 40,
    color: '#000',
  },
  photoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  photo: {
    width: 200,
    height: 180,
    borderRadius: 12,
  },
  addPhoto: {
    position: 'absolute',
    bottom: -20,
    right: 70,
    backgroundColor: '#b70a49',
    padding: 15,
    borderRadius: 50,
    elevation: 5,
  },
});
