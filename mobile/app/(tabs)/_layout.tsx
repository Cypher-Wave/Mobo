import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerStyle: { backgroundColor: '#b70a49' },
          headerTintColor: '#fff',
          drawerActiveTintColor: '#b70a49',
          drawerLabelStyle: { fontWeight: 'bold' },
        }}
      >
        <Drawer.Screen name="index" options={{ title: 'Home' }} />
        <Drawer.Screen name="dashboard" options={{ title: 'Dashboard' }} />
        <Drawer.Screen
          name="previsao-de-colheita"
          options={{ title: 'Previsão de Colheita' }}
        />
        <Drawer.Screen name="garra" options={{ title: 'Garra' }} />
        <Drawer.Screen
          name="curiosidades"
          options={{ title: 'Curiosidades' }}
        />
        <Drawer.Screen name="relatorios" options={{ title: 'Relatórios' }} />
        <Drawer.Screen name="alertas" options={{ title: 'Alertas' }} />
      </Drawer>
    </GestureHandlerRootView>
  );
}
