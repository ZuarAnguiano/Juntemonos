import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { DetailsEventModel } from '../model/DetailsEventModel'
import DataEvent from '../views/DataEvent';
import Reviews from '../views/Reviews';
import EventUsers from '../views/EventUser';
import { useRoute } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';


export default function DetailsEventEScreen() {
    //useRoute se utiliza ya que al redireccionar(desde events) a esta pantalla se mando una variable {id}
    const route = useRoute();
    const { id } = route.params;
    const eventId = id;
    const [event, setEvent] = useState([]);
    const rating = 0;

    //Buscar el evento con el id recuperado anteriormente, hacemo uso de la clase "DetailsEventModel"
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
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
    }, containerGraph: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#000",
        padding: 10,
        marginBottom: 10,
        paddingHorizontal: 20,
    },
    graph: {

        justifyContent: 'center',
        alignItems: 'center'
    }
});
