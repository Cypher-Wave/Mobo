import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Slider from '@react-native-community/slider';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

export default function Garra() {
  const [started, setStarted] = useState(false);

  return (
    <View style={styles.container}>
      
      {/* Título */}
      <Text style={styles.title}>Configurações do Braço Mecânico</Text>

      {/* Card do braço mecânico */}
      <View style={styles.cardArm}>
        <Image
          source={require('../assets/images/imgGarra.png')}
          style={styles.armImage}
          resizeMode="contain"
        />

        {/* Câmera */}
        <View style={styles.iconCamera}>
          <Ionicons name="camera" size={28} color="#144714" />
          <Text style={styles.iconText}>Camera</Text>
        </View>

        {/* Sensores abaixo da câmera */}
        <View style={styles.iconSensorBelowCamera}>
          <FontAwesome5 name="map-marker-alt" size={28} color="#144714" />
          <Text style={styles.iconText}>Sensores</Text>
        </View>
      </View>

      {/* Controle circular */}
      <View style={styles.controlContainer}>
        <View style={styles.directionWrapper}>

          {/* CIMA */}
          <TouchableOpacity style={[styles.dirBtn, { top: 15 }]}>
            <Text style={styles.arrow}>▲</Text>
          </TouchableOpacity>

          {/* ESQUERDA */}
          <TouchableOpacity style={[styles.dirBtn, { left: 15 }]}>
            <Text style={styles.arrow}>◀</Text>
          </TouchableOpacity>

          {/* DIREITA */}
          <TouchableOpacity style={[styles.dirBtn, { right: 15 }]}>
            <Text style={styles.arrow}>▶</Text>
          </TouchableOpacity>

          {/* BAIXO */}
          <TouchableOpacity style={[styles.dirBtn, { bottom: 15 }]}>
            <Text style={styles.arrow}>▼</Text>
          </TouchableOpacity>

          {/* Botão Start */}
          <TouchableOpacity
            style={styles.startButton}
            onPress={() => setStarted(!started)}
          >
            <Text style={styles.startText}>{started ? "Stop" : "Start"}</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.controlTitle}>Controle de direção</Text>
      </View>

      {/* Controle de movimentação inferior */}
      <View style={styles.motionWrapper}>

        <TouchableOpacity style={styles.btnRound}>
          <Text style={styles.arrowBig}>◀</Text>
        </TouchableOpacity>

        <View style={styles.sliderWrapper}>
          <Ionicons name="aperture" size={22} color="#fff" style={{ marginRight: 4 }} />

          <Slider
            style={{ width: 150, height: 40 }}
            minimumValue={0}
            maximumValue={100}
            minimumTrackTintColor="#fff"
            maximumTrackTintColor="#fff"
            thumbTintColor="#fff"
          />
        </View>

        <TouchableOpacity style={styles.btnRound}>
          <Text style={styles.arrowBig}>▶</Text>
        </TouchableOpacity>
      </View>

      {/* Botões verticais */}
      <View style={styles.verticalButtons}>
        <TouchableOpacity style={styles.btnVertical}><Text style={styles.arrowBig}>▲</Text></TouchableOpacity>
        <TouchableOpacity style={styles.btnVertical}><Text style={styles.arrowBig}>▼</Text></TouchableOpacity>
      </View>

      <Text style={styles.motionTitle}>Controle de movimentação</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECE2D6',
    paddingHorizontal: 20,
    paddingTop: 40,
  },

  title: {
    color: '#B70A49',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    marginRight: 150,
  },

  /* CARD */
  cardArm: {
    backgroundColor: '#ffff',
    borderRadius: 20,
    overflow: 'hidden',
    width: '90%',
    height: 300,
    position: 'relative',
    marginLeft: 30,
    borderWidth: 8,
    borderColor: '#B70A49',
  },

  armImage: {
    width: '90%',
    height: '90%',
  },

  iconCamera: {
    position: 'absolute',
    top: 15,
    right: 20,
    backgroundColor: '#fff',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',

    // sombra
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },

  iconSensorBelowCamera: {
    position: 'absolute',
    top: 65,
    right: 14,
    backgroundColor: '#fff',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',

    // sombra
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },

  iconText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#144714',
    fontWeight: 'bold',
  },

  /* CONTROLE DIREÇÃO */
  controlContainer: {
    marginTop: 35,
    alignItems: 'center',
  },

  directionWrapper: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderColor: '#3C4C27',
    borderWidth: 7,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',

    // sombra leve do círculo
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6,
  },

  dirBtn: {
    position: 'absolute',
    width: 35,
    height: 35,
    borderRadius: 22.5,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',

    // sombra
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
  },

  arrow: {
    fontSize: 22,
    color: '#3C4C27',
    fontWeight: 'bold',
  },

  startButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#61743D',
    justifyContent: 'center',
    alignItems: 'center',

    // sombra
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },

  startText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  controlTitle: {
    marginTop: 15,
    marginBottom: 52,
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#61743D',
    width: 200,
    height: 32,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#3C4C27',
    alignSelf: 'center',
  },

  /* CONTROLE MOVIMENTAÇÃO */
  motionWrapper: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  btnRound: {
    backgroundColor: '#B70A49',
    width: 55,
    height: 55,
    borderRadius: 27.5,
    justifyContent: 'center',
    alignItems: 'center',

    // sombra
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.28,
    shadowRadius: 4,
    elevation: 6,
  },

  arrowBig: {
    fontSize: 30,
    color: '#fff',
  },

  sliderWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#B70A49',
    paddingHorizontal: 10,
    paddingVertical: 16,
    borderRadius: 20,
    marginHorizontal: 15,
    width: 220,
    height: 55,

    // sombra
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 6,
  },

  verticalButtons: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 5,
    marginTop: -134,
    gap: 70,
  },

  btnVertical: {
    backgroundColor: '#B70A49',
    width: 55,
    height: 55,
    borderRadius: 27.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,

    // sombra
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.28,
    shadowRadius: 4,
    elevation: 6,
  },

  motionTitle: {
    textAlign: 'center',
    marginTop: 10,
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#B70A49',
    width: 248,
    height: 42,
    borderRadius: 20,
    textAlignVertical: 'center',
    alignSelf: 'center',
  },
});
