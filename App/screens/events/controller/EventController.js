import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React,{useState, useEffect} from 'react'

import { EventModel } from '../model/EventModel';
import EventsProgress from '../views/EventsProgress'
import EventHistory from '../views/EventHistory'
import { useNavigation,useFocusEffect } from '@react-navigation/native';


export default function EventsScreen() {
    const navigation = useNavigation();
    const [events, setEvents] = useState([]);
    console.log(events)

    useFocusEffect(
        React.useCallback(() => {
            const fetchEvents = async () => {
                try {
                    const eventsFromDB = await EventModel.getEvents();
                    setEvents(eventsFromDB);
                } catch (error) {
                    console.error('Error fetching events:', error);
                }
            };
            fetchEvents();
        }, [])
    );

    //Cuando se haga swipe y el usuario seleccione que "Si" en eliminar, se elimina el evento de events
    const deleteEvent = async (eventId) => {
        const success = await EventModel.deleteEvent(eventId);
        if (success) {
            setEvents(events.filter(event => event.id !== eventId));
        }
    };

    const navigateToCreateEvent = () => {
        navigation.navigate('CreateEvent');
    };

    return (
        <View style={styles.container}>
            <EventsProgress events={events} />
            <EventHistory events={events}/>
            <TouchableOpacity style={styles.floatingButton} onPress={navigateToCreateEvent}>
                <Text style={styles.floatingButtonText}>+</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    headerText: {
        fontSize: 20,
        justifyContent: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    floatingButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: "purple",
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
    },
    floatingButtonText: {
        color: "white",
        fontSize: 30,
        textAlign: "center",

    },


});