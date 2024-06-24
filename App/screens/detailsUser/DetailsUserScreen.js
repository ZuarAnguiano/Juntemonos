import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

import ImgProfile from './ImgProfile'
import Intereses from './Interest'
import EventHistory from './EventHistory';

export default function InicioScreen() {


  return (
    <View style={styles.container}>

        <ImgProfile />
        <Intereses styles={styles.section} />
        <EventHistory />
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },

});


