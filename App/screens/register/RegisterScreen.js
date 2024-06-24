import React, { useState } from "react";
import { View, Text, TextInput } from 'react-native';
import styles from "./Style";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';
import { Button } from "react-native-elements";

export function RegisterScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function createUser() {
        await createUserWithEmailAndPassword(auth, email, password)     
        .then(value => {
            console.log('Registrado correctamente! \n' + value.user.uid.email);
            {
              alert('Registro creado exitosamente');
            }
          })
        .catch(error => console.log(error,(alert('Ingrese un correo electrónico válido y una contraseña de 6 dígitos'))));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.cadastroText}>REGISTRATE</Text>
            <TextInput 
              placeholder="email"
              placeholderTextColor="#313131"
              value={email}
              onChangeText={value => setEmail(value)}
              style={styles.input}
            />
            <TextInput 
              placeholder="registrar contraseña con 6 caracteres"
              placeholderTextColor="#313131"
              value={password}
              onChangeText={value => setPassword(value)}
              style={styles.input}
              maxLength={6}
              secureTextEntry={true}
            />

            <Button
              buttonStyle={styles.button} 
              title="REGISTRAR"
              onPress={() => createUser()}
            />

            <Text 
              style={styles.loginText}
              onPress={() => navigation.navigate('Login')}>
              ¿Te registraste? Haga clic aquí para ingresar
            </Text> 
        </View>
    )
}