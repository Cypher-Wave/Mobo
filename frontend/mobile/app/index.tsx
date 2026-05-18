import { router } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';

export default function Index() {
  const opacity = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 900,
        useNativeDriver: true,
      }).start(() => {
        router.replace('/login');
      });
    }, 2200);

    return () => clearTimeout(timer);
  }, [opacity]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#B9B88A',
      }}
    >
      <Animated.Image
        source={require('../assets/images/splash.png')}
        style={{
          width: '100%',
          height: '100%',
          opacity,
        }}
        resizeMode="cover"
      />
    </View>
  );
}