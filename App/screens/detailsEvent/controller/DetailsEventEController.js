import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { DetailsEventModel } from '../model/DetailsEventModel'
import DataEvent from '../views/DataEvent';
import Reviews from '../views/Reviews';
import EventUsers from '../views/EventUser';
import { useRoute } from '@react-navigation/native';


export default function DetailsEventNV(varEvent) {
    //Buscar el registro con ese id
    const route = useRoute();
    const { id } = route.params;
    const eventId = id;
    const [event, setEvent] = useState([]);
    const rating = 0;
    const eventUsers = 200;

    useEffect(() => {
        const fetchEventById = async () => {
            try {
                console.log(eventId)
                const event = await DetailsEventModel.getEventById(eventId);
                setEvent(event);
            } catch (error) {
                console.log(' no entra')
                console.error('Error fetching event:', error);
            }
        };
        fetchEventById();
    }, [eventId]);

    return (
        <View style={styles.container}>
            <ScrollView>
                <View>
                    <Text style={styles.header}>{`Evento ${event.name}`}</Text>
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
});