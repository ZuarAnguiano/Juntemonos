import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Button, TextInput, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { UserLocationContext } from '../../home/views/UserLocationContext';
import { CreateEventModel } from '../model/CreateEventModel';
import EventForm from '../views/FormEvent';
import EventMap from '../views/EventMap';
import EventDatePicker from '../views/EventDatePicker';
import Interest from '../views/Interest';
import { useNavigation } from '@react-navigation/native';
import { db } from '../../../../firebaseConfig';


export default function CreateEventScreen() {
    const navigation = useNavigation();
    const [textNameEvent, setTextNameEvent] = useState('');
    const [textDescription, setTextDescription] = useState('');
    const [date, setDate] = useState(new Date());
    const { location } = useContext(UserLocationContext);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [selectedInterests, setSelectedInterests] = useState([]);

    const [markerCoords, setMarkerCoords] = useState({
        latitude: location.latitude,
        longitude: location.longitude,
    });

    const handleMarkerDrag = (e) => {
        setMarkerCoords(e.nativeEvent.coordinate);
        console.log(markerCoords)
    };

    const handleInterestChange = (interest, isChecked) => {
        if (isChecked) {
            setSelectedInterests([...selectedInterests, interest]);
        } else {
            setSelectedInterests(selectedInterests.filter(item => item !== interest));
        }
    };

    useEffect(() => {
        console.log("Intereses seleccionados: ", selectedInterests);
    }, [selectedInterests]);

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(false);
        setDate(currentDate);
        console.log(formatDate(currentDate));
    };

    const onChangeTime = (event, selectedTime) => {
        const currentDate = selectedTime || date;
        setShowTimePicker(false);
        if (selectedTime) {
            const updatedDate = new Date(date);
            updatedDate.setHours(selectedTime.getHours());
            updatedDate.setMinutes(selectedTime.getMinutes());
            setDate(updatedDate);
            console.log(formatTime(updatedDate));
        }
    };

    const showDatepicker = () => {
        setShowTimePicker(false);
        setShowDatePicker(!showDatePicker);
    };

    const showTimepicker = () => {
        setShowDatePicker(false);
        setShowTimePicker(!showTimePicker);
    };

    const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const formatTime = (date) => {
        return date.toLocaleString('es-ES', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        });
    };

    const SaveEvent = async () => {
        if (textNameEvent === "") {
            alert("Por Favor Ingresa el Nombre del Evento");
        } else {
            const newEvent = new CreateEventModel(
                textNameEvent,
                textDescription,
                date,
                markerCoords,
                selectedInterests
            );
            const success = await CreateEventModel.saveEvent(newEvent);
            if (success) {
                navigation.navigate("Events");
                console.log('Event saved:', newEvent);
            } else {
                console.log('Failed to save event');
            }
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.ContainerScroll}>

                <EventForm
                    textNameEvent={textNameEvent}
                    setTextNameEvent={setTextNameEvent}
                    textDescription={textDescription}
                    setTextDescription={setTextDescription}
                />
                <EventMap
                    markerCoords={markerCoords}
                    handleMarkerDrag={handleMarkerDrag}
                />

                <Interest
                    interests={selectedInterests}
                    onInterestChange={handleInterestChange}
                />

                <EventDatePicker
                    date={date}
                    showDatepicker={showDatepicker}
                    showTimepicker={showTimepicker}
                    formatDate={formatDate}
                    formatTime={formatTime}
                />

                {showDatePicker && (
                    <DateTimePicker
                        value={date}
                        mode="date"
                        display="spinner"
                        onChange={onChangeDate}
                    />
                )}

                {showTimePicker && (
                    <DateTimePicker
                        value={date}
                        mode="time"
                        display="spinner"
                        onChange={onChangeTime}
                    />
                )}

                <View style={styles.button}>
                    <Button title='Guardar' onPress={SaveEvent} />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    ContainerScroll: {
        paddingHorizontal: 40,
        paddingBottom: 5,
    },
    containerInput: {
        marginBottom: 30,
    },
    input: {
        padding: 5,
        fontSize: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    dateText: {
        fontSize: 16,
        marginTop: 10,
        marginBottom: 20,
    },
    mapContainer: {
        width: '100%',
        height: 150,
        borderWidth: 1,
        borderColor: '#000',
        marginBottom: 30,
    },
    dateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    inputDate: {
        padding: 5,
        fontSize: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        textAlign: 'center'
    },
    button: {
        marginTop: 30
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});
