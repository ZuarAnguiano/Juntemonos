import { View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';

export default function EventHistory({ events }) {
    const navigation = useNavigation();

    const navigateToDetailsEventNV = (id) => {
        navigation.navigate('DetailsEventNVScreen', { id }); // Navega a la pantalla de detalles del evento con el parámetro event_name
    };

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.headerText}>Historial</Text>
            </View>
            <View style={styles.section}>
                <ScrollView >
                    {events && events.map((event, index) => (
                        <SwipeableItem key={index} onSwipeRight={() => onDeleteEvent(event.id)}>
                            <TouchableOpacity onPress={() => navigateToDetailsEventNV(event.id)}>
                                <View style={styles.eventItem}>
                                    <Text>{event.name}</Text>
                                    <Text>{event.date.seconds ? new Date(event.date.seconds * 1000).toLocaleDateString() : ''}</Text>
                                </View>
                            </TouchableOpacity>
                        </SwipeableItem>
                    ))}

                </ScrollView>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    section: {
        borderWidth: 1,
        borderColor: '#000',
        padding: 5,
        marginBottom: 80,
        flex: 1
    },
    headerText: {
        fontSize: 20,
        justifyContent: 'center',
        marginBottom: 10,
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