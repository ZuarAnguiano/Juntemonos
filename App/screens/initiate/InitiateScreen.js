import React from 'react';
import { View, Text } from 'react-native';
import styles from './Style';

const InitiateScreen = ({ navigation }) => (
  <View style={styles.home}>
    <Text style={styles.homeText}>Bienvenido</Text>

    <Text
      style={styles.loginText}
      onPress={() => navigation.navigate('Login')}>
      LOGIN
    </Text> 

    <Text
      style={styles.loginText}
      onPress={() => navigation.navigate('Register')}>
      REGISTRAR
    </Text> 
  </View>
);

InitiateScreen.navigationOptions = {
  title: 'Home',
}



export default InitiateScreen;