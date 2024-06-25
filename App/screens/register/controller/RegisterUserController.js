import React, { useState } from 'react';
import FormRegister from '../views/FormRegister';
import DateTimePicker from '@react-native-community/datetimepicker';
import { RegisterModel } from '../model/RegisterModel';
import { Alert, StyleSheet, View, Text } from 'react-native';

export default function RegisterUserController({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [name, setName] = useState('');
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    //Funcion para registrar el usuario utilizando el metodo del modelo.
    async function handleRegister() {
        try {
            if (password.length < 6) {
                Alert.alert('La contraseña debe tener al menos 6 caracteres.');
                return;
            } else if (repeatPassword != password) {
                Alert.alert('La contraseña debe ser iguales');
                return;
            }
            const newUser = new RegisterModel(email, password, name, date);
            const user = await RegisterModel.register(newUser);

            if (user) {
                Alert.alert('Registro exitoso', 'Tu cuenta ha sido creada exitosamente.');
                navigation.navigate('Login');
                console.log('Usuario registrado:', newUser);
            } else {
                console.log('Failed to save user');
            }
        } catch (error) {
            if (error.message === 'El correo electrónico ya está registrado.') {
                Alert.alert('Error de registro', 'El correo electrónico ya está en uso. Por favor, utiliza otro correo.');
            } else {
                console.error('Error al registrar el usuario:', error.message);
                Alert.alert('Error de registro', 'Hubo un error al intentar registrar tu cuenta. Por favor, inténtalo de nuevo.');
            }
        }
    }

    //Seleccionar y cambiar fecha
    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(false);
        setDate(currentDate);
        console.log(formatDate(currentDate));
    };

    //Mostrar el datePicker
    const showDatepicker = () => {
        setShowDatePicker(!showDatePicker);
    };

    //Formatear la fecha, es decir, mostrarlo legible
    const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.textTitle}>REGÍSTRATE</Text>
            <FormRegister
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                repeatPassword={repeatPassword}
                setRepeatPassword={setRepeatPassword}
                name={name}
                setName={setName}
                handleRegister={handleRegister}
                navigation={navigation}
                onShowDatepicker={showDatepicker}
                formatDate={formatDate}
                date={date}
            />


            {showDatePicker && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="spinner"
                    onChange={onChangeDate}
                    maximumDate={new Date()}
                />
            )}
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    textTitle: {
        marginVertical: 50,
        textAlign: 'center',
        fontSize: 20,
        color: '#808080',
    },
})