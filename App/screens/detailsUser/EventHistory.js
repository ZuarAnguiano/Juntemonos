import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import EventsUbications from '../../utils/EventsUbications.json';
import SwipeableItem from '../../components/SwipeableItem';

export default function EventrHistory() {
    //Se le asignan los eventos del json EventsUbications
    const [events, setEvents] = useState(EventsUbications);

    //Cuando se haga swipe y el usuario seleccione que "Si" en eliminar, se elimina el evento de events
    const handleDelete = (eventName) => {
        console.log(eventName);
        setEvents((prevEvents) =>
            prevEvents.filter((event) => event.event_name !== eventName)
        );
    };

    return (
        <View style={styles.section}>
            <Text style={styles.headerText}>Historial de eventos</Text>
            <ScrollView>
                <View >
                    {events.map((event, index) => (
                        <SwipeableItem key={index} onSwipeRight={() => handleDelete(event.event_name)}>
                            <View style={styles.eventItem}>
                                <Text>{event.event_name}</Text>
                                <Text>{event.date}</Text>
                            </View>
                        </SwipeableItem>
                    ))}
                </View>
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    section: {
        borderWidth: 1,
        borderColor: '#000',
        padding: 5,
        marginBottom: 10,
        flex: 1
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        justifyContent: 'center',
        textAlign: 'center'
    },
    eventItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: "#fff"
    }
})