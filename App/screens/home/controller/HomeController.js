import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { HomeModel } from '../model/HomeModel';
import AppMapView from '../views/MapView'

export default function HomeController({ navigation }) {
  const [events, setEvents] = useState([]);


  //Traer los eventos para mostrarlos en el mapa y para la busqueda
  useFocusEffect(
    React.useCallback(() => {
      const fetchEvents = async () => {
        try {
          const eventsFromDB = await HomeModel.getEvents();
          setEvents(eventsFromDB);
        } catch (error) {
          console.error('Error fetching events:', error);
        }
      };
      fetchEvents();
    }, [])
  );

  // Navega a la pantalla de perfil de usuario
  const navigateToDetailsUser = () => {
    navigation.navigate('DetailsUser');
  };

  // Navega a la pantalla de eventos
  const navigateToEvents = () => {
    navigation.navigate('Events');
  };

  return (
    <View style={styles.container}>
      <AppMapView events={events} />

      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={navigateToDetailsUser}>
          <FontAwesome name="user-circle-o" size={54} color="#d00281" />
        </TouchableOpacity>

        <TouchableOpacity onPress={navigateToEvents}>
          <FontAwesome5 name="clipboard-list" size={54} color="#d00281" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 30
  }
});