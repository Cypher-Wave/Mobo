import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

export default function Garra() {
  const [started, setStarted] = useState(false);
  const [isOn, setIsOn] = useState(true);

  const toggleStartStop = () => setStarted(!started);
  const handleDirection = (dir: string) => alert(`Direção: ${dir}`);

  return (
    <View style={styles.container}>
      {/* Título */}
      <Text style={styles.title}>Câmera</Text>

      {/* Visor da câmera */}
      <View style={styles.cameraView}>
        <Image
          source={require('../assets/images/imgcamera.png')}
          style={styles.cameraImage}
          resizeMode="cover"
        />
      </View>

      {/* Controle remoto circular */}
      <View style={styles.controlWrapper}>
        {/* Direcional cima */}
        <TouchableOpacity style={[styles.dirBtn, { top: 25 }]} onPress={() => handleDirection('Cima')}>
          <Text style={styles.arrow}>▲</Text>
        </TouchableOpacity>

        {/* Direcional esquerda */}
        <TouchableOpacity style={[styles.dirBtn, { left: 25 }]} onPress={() => handleDirection('Esquerda')}>
          <Text style={styles.arrow}>◀</Text>
        </TouchableOpacity>

        {/* Botão Start/Stop */}
        <TouchableOpacity style={styles.startButton} onPress={toggleStartStop}>
          <Text style={styles.startText}>{started ? 'STOP' : 'START'}</Text>
        </TouchableOpacity>

        {/* Direcional direita */}
        <TouchableOpacity style={[styles.dirBtn, { right: 25 }]} onPress={() => handleDirection('Direita')}>
          <Text style={styles.arrow}>▶</Text>
        </TouchableOpacity>

        {/* Direcional baixo */}
        <TouchableOpacity style={[styles.dirBtn, { bottom: 25 }]} onPress={() => handleDirection('Baixo')}>
          <Text style={styles.arrow}>▼</Text>
        </TouchableOpacity>

        {/* Zoom + */}
        <TouchableOpacity style={[styles.zoomBtn, { left: -70 }]} onPress={() => alert('Zoom +')}>
          <Text style={styles.zoomText}>+</Text>
        </TouchableOpacity>

        {/* Zoom - */}
        <TouchableOpacity style={[styles.zoomBtn, { right: -70 }]} onPress={() => alert('Zoom -')}>
          <Text style={styles.zoomText}>-</Text>
        </TouchableOpacity>
      </View>

      {/* Barra inferior */}
      <View style={styles.bottomMenu}>
        {/* Ícone câmera */}
        <View style={styles.menuItem}>
          <Ionicons name="camera" size={28} color="#B70A49" />
          <Text style={styles.menuText}>Câmera</Text>
        </View>

        {/* Toggle On/Off */}
        <TouchableOpacity style={styles.toggleWrapper} onPress={() => setIsOn(!isOn)}>
          <View style={[styles.toggle, isOn && styles.toggleOn]}>
            <View style={[styles.toggleCircle, isOn && styles.toggleCircleOn]} />
          </View>
          <Text style={[styles.toggleText, { color: isOn ? '#B70A49' : '#666' }]}>
            {isOn ? 'On' : 'Off'}
          </Text>
        </TouchableOpacity>

        {/* Ícone sensores */}
        <View style={styles.menuItem}>
          <FontAwesome5 name="map-marker-alt" size={28} color="green" />
          <Text style={styles.menuText}>Sensores</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0E5D8',
    alignItems: 'center',
    paddingTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#B70A49',
    marginBottom: 10,
  },
  cameraView: {
    width: '90%',
    height: 300, // Aumentado
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 80,
    backgroundColor: '#ccc',
  },
  cameraImage: {
    width: '100%',
    height: '100%',
  },
  controlWrapper: {
    width: 320, // Aumentado
    height: 320, // Aumentado
    borderRadius: 160,
    backgroundColor: '#F9F4ED',
    borderWidth: 4,
    borderColor: '#B70A49',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 100,
    position: 'relative',
  },
  startButton: {
    width: 150, // Aumentado
    height: 150, // Aumentado
    borderRadius: 75,
    backgroundColor: '#B70A49',
    justifyContent: 'center',
    alignItems: 'center',
  },
  startText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  dirBtn: {
    position: 'absolute',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    backgroundColor: 'transparent',
  },
  arrow: {
    fontSize: 24,
    color: '#B70A49',
    fontWeight: 'bold',
  },
  zoomBtn: {
    position: 'absolute',
    top: '40%',
    width: 50,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#B70A49',
    justifyContent: 'center',
    alignItems: 'center',
  },
  zoomText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  bottomMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 30,
    marginTop: 10,
  },
  menuItem: {
    alignItems: 'center',
  },
  menuText: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: 'bold',
  },
  toggleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 20,
  },
  toggle: {
    width: 50,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    padding: 2,
  },
  toggleOn: {
    backgroundColor: '#B70A49',
  },
  toggleCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
    transform: [{ translateX: 0 }],
  },
  toggleCircleOn: {
    transform: [{ translateX: 22 }],
  },
  toggleText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
