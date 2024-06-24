import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import EventsUbications from '../../utils/EventsUbications.json'
import DataEvent from './views/DataEvent';
import Reviews from './views/Reviews';
import { Entypo } from '@expo/vector-icons';


export default function DetailsEventNV() {
    //Buscar el registro con ese nombre de evento para mostrar uno solamente
    const eventName = "Run";
    const event = EventsUbications.find(event => event.event_name === eventName);

    const rating = event.rating; // Calificacion del evento

    return (

        <View style={styles.container}>
            <ScrollView>
                <View>
                    <Text style={styles.header}>{`Evento ${event.event_name}`}</Text>
                </View>

                <DataEvent event={event} />

                <Reviews rating={rating} />

                <View style={styles.containerGraph}>
                    <Text style={styles.headerText}>Usuarios en el evento</Text>

                    <View style={styles.graph}>
                        <Entypo name="bar-graph" size={120} color="black" />
                    </View>
                </View>
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
    headerText: {
        fontSize: 20,
        marginBottom: 10,
        justifyContent: 'center',
    },
    containerGraph: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#000",
        padding: 10,
        marginBottom: 10,
        paddingHorizontal: 20
    },
    graph: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});
