import { View, Text, StyleSheet, TextInput, Alert, TouchableOpacity, Platform } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE, PROVIDER_DEFAULT } from 'react-native-maps';
import MapViewStyle from '../../../utils/MapViewStyle.json';
import { UserLocationContext } from './UserLocationContext';
import MarkerMap from './MarkerMap';


export default function AppMapView({ events }) {
    const { location } = useContext(UserLocationContext);
    const [searchText, setSearchText] = useState('');
    const [region, setRegion] = useState([]);

    //Actualizar la longitude y latitude si se actualiza location 
    useEffect(() => {
        if (location) {
            setRegion({
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.0422,
                longitudeDelta: 0.0421
            });
        }
    }, [location]);

    //Funcion cuando el usuario busca... se actualiza region para centrar el mapa y ubicarlo a esa busqeda
    const handleSearch = () => {
        const eventLocation = events.find(event => event.name.toLowerCase() === searchText.toLowerCase());
        if (eventLocation) {
            setRegion({
                latitude: eventLocation.coordinates.latitude,
                longitude: eventLocation.coordinates.longitude,
                latitudeDelta: 0.0042,
                longitudeDelta: 0.0041
            });
        } else {
            Alert.alert('Ese evento no existe')
        }
    };

    return region && (
        <View>
            <TextInput
                style={styles.searchEvents}
                placeholder="Buscador de eventos"
                value={searchText}
                onChangeText={setSearchText}
                onSubmitEditing={handleSearch}
            />
            <View style={styles.mapContainer}>
                <MapView
                    style={styles.map}
                    provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
                    showsUserLocation={true}
                    customMapStyle={MapViewStyle}
                    region={region}
                >
                    {events.map((event, index) => (
                        <MarkerMap key={index} place={event} />
                    ))}
                </MapView>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchEvents: {
        borderColor: 'gray',
        padding: 8,
        marginTop: 8,
        width: '100%',
        backgroundColor: 'white',
        marginBottom: 40
    },
    mapContainer: {
        width: '100%',
        height: '70%',
        borderRadius: 300,
        overflow: 'hidden',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },

});
