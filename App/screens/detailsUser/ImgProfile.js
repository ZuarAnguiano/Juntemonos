import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Modal, Button } from 'react-native'
import React, { useState, useEffect } from 'react'
import * as ImagePicker from 'expo-image-picker'

import ModalPhoto from './ModalPhoto'

export default function ImgProfile() {

    //Guarda usuarios traidos de la api
    const [user, setUser] = useState({});
    //Muestra o oculta modal
    const [isModalVisible, setIsModalVisible] = useState(false);
    //Guardar imagen seleccionada
    const [image, setImage] = useState();

    //fetch de usuarios
    const fetchData = async (url) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.results && data.results.length > 0) {
                setUser(data.results[0]);
            }
        } catch (error) {
            console.error(error);

        }
    };

    useEffect(() => {
        fetchData("https://randomuser.me/api/?results=1");
    }, []);


   
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


    return (
        <View style={styles.profileSection}>
            <View style={styles.imgContainer}>
                <Image source={{ uri: image ? image : user.picture?.large }} style={styles.image} />
                <TouchableOpacity>
                    <Text style={styles.changePhotoText} onPress={() => setIsModalVisible(true)}>Cambiar foto</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.personalData}>
                <ScrollView >
                    <Text style={styles.headerText}>Datos Personales</Text>
                    <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
                    <Text>Nombre: {`${user.name?.first} ${user.name?.last}`}</Text>
                    <Text>Email: {user.email}</Text>
                    <Text>Edad: {user.dob?.age} años</Text>
                    <Text>Sexo: {user.gender === 'male' ? 'Masculino' : 'Femenino'}</Text>
                    <Text>Ubicación: {`${user.location?.city}, ${user.location?.country}`}</Text>
                </ScrollView>
            </View>


            <ModalPhoto isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} uploadImage={uploadImage} />

        </View >
    )
}


const styles = StyleSheet.create({
    profileSection: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    imgContainer: {
        borderWidth: 1,
        borderColor: '#000',
        padding: 5,
        height: 120,
        width: 120,
        marginRight: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 45,
    },
    changePhotoText: {
        color: '#d00281',
        textDecorationLine: 'underline',
        marginTop: 10,
    },
    personalData: {
        flex: 1,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        borderColor: '#000',
        padding: 5,
        height: 150,
        width: 150
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        justifyContent: 'center',
        textAlign: 'center'
    }
})