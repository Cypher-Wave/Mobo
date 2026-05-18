import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { colors } from '../components/mobo-ui';

export default function Cadastro() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { width, height } = useWindowDimensions();
  const horizontalPadding = width * 0.1;

  function handleSubmit() {
    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      alert('Preencha todos os campos.');
      return;
    }

    if (!email.includes('@')) {
      alert('Digite um e-mail válido.');
      return;
    }

    if (password !== confirmPassword) {
      alert('As senhas precisam ser iguais.');
      return;
    }

    router.push('/(tabs)/completar-cadastro');
  }

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style="light" backgroundColor={colors.red} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          { minHeight: Math.max(height, 844) },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.phoneFrame}>
          <Image
            source={require('../assets/images/logo-branca.png')}
            style={styles.logo}
            resizeMode="contain"
          />

          <View style={styles.hero}>
            <Image
              source={require('../assets/images/robofrosa.png')}
              style={styles.heroImage}
              resizeMode="cover"
            />
          </View>

          <View
            style={[
              styles.formPanel,
              {
                paddingHorizontal: horizontalPadding,
              },
            ]}
          >
            <Text style={styles.title}>Faça seu Cadastro</Text>

            <View style={styles.fieldWrapper}>
              <View style={styles.labelBox}>
                <Text style={styles.labelText}>Email</Text>
              </View>

              <View style={styles.field}>
                <Ionicons
                  name="mail-outline"
                  size={31}
                  color={colors.cream}
                  style={styles.fieldIcon}
                />

                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Digite seu email"
                  placeholderTextColor="#D38BA2"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={styles.input}
                />
              </View>
            </View>

            <View style={styles.fieldWrapper}>
              <View style={styles.labelBox}>
                <Text style={styles.labelText}>Senha</Text>
              </View>

              <View style={styles.field}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setShowPassword((value) => !value)}
                  style={styles.passwordEyeButton}
                >
                  <Ionicons
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={34}
                    color={colors.cream}
                  />
                </TouchableOpacity>

                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Digite sua senha"
                  placeholderTextColor="#D38BA2"
                  secureTextEntry={!showPassword}
                  style={styles.input}
                />
              </View>
            </View>

            <View style={[styles.fieldWrapper, styles.confirmFieldWrapper]}>
              <View style={styles.field}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setShowConfirmPassword((value) => !value)}
                  style={styles.passwordEyeButton}
                >
                  <Ionicons
                    name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={34}
                    color={colors.cream}
                  />
                </TouchableOpacity>

                <TextInput
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="Confirme sua senha"
                  placeholderTextColor="#D38BA2"
                  secureTextEntry={!showConfirmPassword}
                  style={styles.input}
                />
              </View>
            </View>

            <View style={styles.buttonShadow}>
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={handleSubmit}
                style={styles.registerButton}
              >
                <Text style={styles.registerButtonText}>Cadastre-se</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => router.push('/(tabs)/login')}
              style={styles.loginLinkButton}
            >
              <Text style={styles.loginText}>
                Já possui conta?{' '}
                <Text style={styles.loginStrong}>Faça o login</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.wine,
  },
  scroll: {
    flex: 1,
    backgroundColor: colors.wine,
  },
  scrollContent: {
    flexGrow: 1,
    backgroundColor: colors.wine,
  },
  phoneFrame: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: colors.red,
  },
  logo: {
    position: 'absolute',
    top: 70,
    alignSelf: 'center',
    width: 112,
    height: 64,
    zIndex: 5,
  },
  hero: {
    height: 380,
    marginTop: 92,
    overflow: 'hidden',
    zIndex: 2,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  formPanel: {
    flex: 1,
    marginTop: -45,
    minHeight: 560,
    backgroundColor: 'rgba(110, 0, 38, 0.80)',
    borderTopLeftRadius: 46,
    borderTopRightRadius: 46,
    paddingTop: 36,
    paddingBottom: 46,
    zIndex: 3,
  },
  title: {
    color: colors.cream,
    fontFamily: 'Livvic_400Regular',
    fontSize: 29,
    lineHeight: 36,
    textAlign: 'center',
    marginBottom: 28,
  },
  fieldWrapper: {
    height: 76,
    marginBottom: 24,
    justifyContent: 'flex-end',
  },
  confirmFieldWrapper: {
    marginTop: 0,
    marginBottom: 42,
  },
  labelBox: {
    position: 'absolute',
    top: 0,
    alignSelf: 'center',
    minWidth: 104,
    height: 30,
    backgroundColor: colors.wine,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  labelText: {
    color: colors.cream,
    fontFamily: 'Livvic_400Regular',
    fontSize: 22,
    lineHeight: 28,
  },
  field: {
    height: 66,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: colors.cream,
    backgroundColor: colors.wine,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 21,
    paddingRight: 16,
  },
  fieldIcon: {
    marginRight: 18,
  },
  passwordEyeButton: {
    width: 40,
    height: 44,
    marginRight: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    height: '100%',
    color: colors.cream,
    fontFamily: 'Livvic_400Regular',
    fontSize: 21,
    paddingVertical: 0,
  },
  buttonShadow: {
    borderRadius: 15,
    backgroundColor: colors.wineDark,
    paddingBottom: 8,
  },
  registerButton: {
    height: 66,
    borderRadius: 15,
    backgroundColor: '#C7034B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerButtonText: {
    color: colors.white,
    fontFamily: 'Livvic_700Bold',
    fontSize: 22,
  },
  loginLinkButton: {
    marginTop: 31,
  },
  loginText: {
    textAlign: 'center',
    color: '#DDD8C9',
    fontFamily: 'Livvic_400Regular',
    fontSize: 20,
    lineHeight: 28,
  },
  loginStrong: {
    color: colors.cream,
    fontFamily: 'Livvic_700Bold',
  },
});