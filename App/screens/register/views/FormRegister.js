import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';

export default function FormRegister({
    email,
    setEmail,
    password,
    setPassword,
    repeatPassword,
    setRepeatPassword,
    name,
    setName,
    handleRegister,
    navigation,
    onShowDatepicker,
    formatDate,
    date,
}) {
    
    return (
        <View style={styles.container}>

            <View style={styles.inputContainer}>
                <Text>Nombre</Text>
                <TextInput
                    placeholder="type your username"
                    placeholderTextColor="#313131"
                    value={name}
                    onChangeText={setName}
                    style={styles.input}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text>Fecha de nacimiento</Text>
                <View style={styles.dateContainer}>
                    <TouchableOpacity onPress={onShowDatepicker}>
                        <Text style={styles.inputDate}>{formatDate(date)}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.inputContainer}>
                <Text>Email</Text>
                <TextInput
                    placeholder="Email"
                    placeholderTextColor="#313131"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text>Contraseña</Text>
                <TextInput
                    placeholder="Password"
                    placeholderTextColor="#313131"
                    value={password}
                    onChangeText={setPassword}
                    style={styles.input}
                    secureTextEntry={true}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text>Repetir contraseña</Text>
                <TextInput
                    placeholder="Repeat password"
                    placeholderTextColor="#313131"
                    value={repeatPassword}
                    onChangeText={setRepeatPassword}
                    style={styles.input}
                    secureTextEntry={true}
                />
            </View>

            <Button
                buttonStyle={styles.button}
                title="REGISTRAR"
                onPress={handleRegister}
            />

            <Text
                style={styles.loginText}
                onPress={() => navigation.navigate('Login')}
            >
                ¿Te registraste? Haga clic aquí para ingresar
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    inputContainer: {
        marginTop: 20,
        width: '80%',
        height: 50,
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#313131',
        width: '100%',
        fontSize: 20,
        color: '#808080'
    },
    dateContainer: {
        width: '100%',
        height: 50,
    },
    inputDate: {
        borderBottomWidth: 1,
        borderBottomColor: '#313131',
        width: '100%',
        padding: 5,
        fontSize: 16,
    },
    button: {
        marginTop: 16,
        paddingVertical: 4,
        borderRadius: 2,
        backgroundColor: "#d00281",
        textAlign: "center",
        fontSize: 20,
        width: 290
    },
    loginText: {
        fontSize: 13,
        color: '#808080',
        alignItems: 'center',
        marginTop: 15
    }
});
