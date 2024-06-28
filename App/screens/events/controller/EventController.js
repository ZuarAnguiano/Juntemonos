import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React,{useState, useContext} from 'react'
import { useNavigation,useFocusEffect } from '@react-navigation/native';

import { EventModel } from '../model/EventModel';
import { CreateEventModel } from '../../createEvent/model/CreateEventModel';
import { DetailsUserModel } from '../../detailsUser/model/DetailsUserModel'
import EventsProgress from '../views/EventsProgress'
import EventHistory from '../views/EventHistory'
import UserContext from '../../../context/AuthContext'



export default function EventsScreen() {
    const navigation = useNavigation();
    const { userId } = useContext(UserContext);
    const [events, setEvents] = useState([]);
    
    console.log(events)

    //Bucar todos los eventos de la bd, hacemos de uso de la clase "EventModel"
    useFocusEffect(
        React.useCallback(() => {
            const fetchEvents = async () => {
                try {
                    const userType = await CreateEventModel.checkUserType(userId);
                    if (userType === 'freemium') {
                        const eventsFromDB = await EventModel.getEventsTen();
                        console.log(eventsFromDB)
                        setEvents(eventsFromDB);
                    } else {
                        const eventsFromDB = await DetailsUserModel.getEvents();
                        setEvents(eventsFromDB);
                    }

                } catch (error) {
                    console.error('Error fetching events:', error);
                }
            };
            fetchEvents();
        }, [])
    );

    //Cuando se haga swipe y el usuario seleccione que "Si" en eliminar, se elimina el evento de events y de la bd
    const deleteEvent = async (eventId) => {
        const success = await EventModel.deleteEvent(eventId);
        if (success) {
            setEvents(events.filter(event => event.id !== eventId));
        }
    };

    //Redireccionar a otra vista
    const navigateToCreateEvent = () => {
        navigation.navigate('CreateEvent');
    };

    return (
        <View style={styles.container}>
            <EventsProgress events={events} onDeleteEvent={deleteEvent} />
            <EventHistory events={events} onDeleteEvent={deleteEvent}/>
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