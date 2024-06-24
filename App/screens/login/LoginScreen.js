import React, { useState } from "react";
import { View, Text, TextInput } from 'react-native';
import styles from './Style';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';
import { Button } from "react-native-elements";
  
export function LoginScreen({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function login() {
      await signInWithEmailAndPassword(auth, email, password)
      .then(value => {
        navigation.navigate('Tabs')
          console.log('Inicie sesión exitosamente! \n' + value.user.uid.email);
          {
            alert('Inicié sesión exitosamente, bienvenido!');
          }
      })
      .catch(error => console.log(error,(alert('Correo o contraseña incorrectos!'))));
  };

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
              onPress={() => login('')}
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