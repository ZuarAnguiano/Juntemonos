import React, { useContext, useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

import ImgProfile from '../views/ImgProfile'
import Intereses from '../views/Interest'
import EventHistory from '../views/EventHistory';
import { DetailsUserModel } from '../model/DetailsUserModel'
import { EventModel } from '../../events/model/EventModel';
import { CreateEventModel } from '../../createEvent/model/CreateEventModel';
import UserContext from '../../../context/AuthContext'

export default function DetailsUserScreen() {
    const { userId } = useContext(UserContext);
    //Guarda usuarios traidos de la bd
    const [user, setUser] = useState({});
    //Guardar imagen seleccionada
    const [image, setImage] = useState();
    //Guardar los eventos de la bd
    const [events, setEvents] = useState([]);
    //Muestra o oculta modal
    const [isModalVisible, setIsModalVisible] = useState(false);
    //intereses marcados Checkbox
    const [selectedInterests, setSelectedInterests] = useState([]);




    //Buscar el usuario con el id del context, hacemos uso de la clase "DetailsUserModel"
    useEffect(() => {
        const fetchUsertById = async () => {
            try {
                console.log(userId)
                const user = await DetailsUserModel.getUserById(userId);
                setUser(user);
            } catch (error) {
                console.log(' no entra')
                console.error('Error fetching event:', error);
            }
        };
        fetchUsertById();
    }, [userId]);

    //Actualizar imagen
    const uploadImage = async (mode) => {
        try {
            await ImagePicker.requestCameraPermissionsAsync();
            let result;
            if (mode === 'camera') {
                result = await ImagePicker.launchCameraAsync({
                    cameraType: ImagePicker.CameraType.front,
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 1
                });
            } else if (mode === 'gallery') {
                result = await ImagePicker.launchImageLibraryAsync({
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 1
                });
            }

            if (!result.cancelled) {
                // Guardar imagen
                await saveImg(result.assets[0].uri);

            }
        } catch (error) {
            console.log("Error al cargar la imagen:", error);
            setIsModalVisible(false);
        }
    };


    const saveImg = async (image) => {
        try {
            setImage(image);
            setIsModalVisible(false);
        } catch (error) {
            throw error;
        }
    }

    //Bucar todos los eventos de la bd, hacemos de uso de la clase "DetailsUserModel"
    useFocusEffect(
        React.useCallback(() => {
            const fetchEvents = async () => {
                try {
                    const userType = await CreateEventModel.checkUserType(userId);
                    if (userType === 'freemium') {
                        const eventsFromDB = await EventModel.getEventsTen();
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
        const success = await DetailsUserModel.deleteEvent(eventId);
        if (success) {
            setEvents(events.filter(event => event.id !== eventId));
        }
    };

    //Agrega los intereses seleccionados a interest 
    const handleInterestChange = (interest, isChecked) => {
        if (isChecked) {
            setSelectedInterests([...selectedInterests, interest]);
        } else {
            setSelectedInterests(selectedInterests.filter(item => item !== interest));
        }
    };


    //Solo imprime los intereses cada que se selecciona uno nuevo, se puede borrar, solo es para ver en la consola
    useEffect(() => {
        console.log("Intereses seleccionados: ", selectedInterests);
    }, [selectedInterests]);


    if (!user) {
        return (
            <View>
                <Text>Usuario no autenticado</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ImgProfile
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
                user={user}
                uploadImage={uploadImage}
                image={image} />

            <Intereses
                styles={styles.section}
                onInterestChange={handleInterestChange} />

            <EventHistory events={events} onDeleteEvent={deleteEvent} />
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


