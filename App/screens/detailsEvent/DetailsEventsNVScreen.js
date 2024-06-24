import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import EventsUbications from '../../utils/EventsUbications.json'
import DataEvent from './views/DataEvent';
import Reviews from './views/Reviews';
import EventUsers from './views/EventUser';
import { useRoute } from '@react-navigation/native';


export default function DetailsEventNV(varEvent) {
    //Buscar el registro con ese nombre de evento para mostrar uno solamente
    const route = useRoute();
    const { eventName } = route.params;
    const event = EventsUbications.find(event => event.event_name === eventName);

    const rating = event.rating ?? 0;

    return (
        <View style={styles.container}>
            <ScrollView>
                <View>
                    <Text style={styles.header}>{`Evento ${event.event_name}`}</Text>
                </View>

                <DataEvent event={event} />

                <Reviews rating={rating} />

                <EventUsers event={event} />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        justifyContent: 'center',
    },
});
