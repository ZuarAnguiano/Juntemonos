import React, { useState } from "react";
import { View, Text, TextInput } from 'react-native';
import styles from './Style';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';
import { Button } from "react-native-elements";

export function LoginScreen({ navigation }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function login() {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Inicie sesión exitosamente! \n', userCredential.user.email);

      // Reinicia la navegación para evitar que el usuario regrese a la pantalla de inicio de sesión
      navigation.reset({
        index: 0,
        routes: [{ name: 'Tabs' }],
      });

      alert('Inicié sesión exitosamente, bienvenido!');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Correo o contraseña incorrectos!');
    }
  }

  async function logout() {
    await signOut(auth)
      .then(() => {
        console.log('Sessão encerrada!');
        {
          alert('Sessão encerrada!');
        }
      })
      .catch(error => console.log(error));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.loginText}>LOGIN</Text>
      <TextInput
        placeholder="email"
        placeholderTextColor="#313131"
        value={email}
        onChangeText={value => setEmail(value)}
        style={styles.input}
      />
      <TextInput
        placeholder="contraseña con 6 caracteres"
        placeholderTextColor="#313131"
        value={password}
        onChangeText={value => setPassword(value)}
        style={styles.input}
        maxLength={6}
        secureTextEntry={true}
      />

      <Button
        buttonStyle={styles.button}
        title="ENTRAR"
        onPress={() => login()}
      />

      <Button
        buttonStyle={styles.button}
        title="SALIR"
        onPress={() => logout()}
      />

      <Text
        style={styles.textCadastro}
        onPress={() => navigation.navigate('Register')}>
        ¿No tienes registro? Pulse aquí para registrarse
      </Text>
    </View>
  )
}