/*Este archivo contiene todo lo referente a la navegacion */
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//importatmos nuestras 
//Screens Iniciales
import InitiateScreen from '../screens/initiate/InitiateScreen'
import { LoginScreen } from '../screens/login/LoginScreen'
import { RegisterScreen } from '../screens/register/RegisterScreen'
//Screen Tabs
import HomeScreen from "../screens/home/controller/HomeController";
import SettingsScreen from "../screens/SettingsScreen";
import StackScreen from "../screens/StackScreen";
//Screens
import EventsScreen from '../screens/events/controller/EventController'
import DetailsUserScreen from '../screens/detailsUser/DetailsUserScreen'
import DetailsEventNVScreen from '../screens/detailsEvent/controller/DetailsEventNVController'
import DetailsEventEScreen from '../screens/detailsEvent/DetailsEventsEScreen'
import CreateEventScreen from '../screens/createEvent/controller/CreateEventController'

//declaramos una variable en una constante de la clase Navigator
const HomeStackNavigator = createNativeStackNavigator();

function MyStack() {
    return (
        <HomeStackNavigator.Navigator
            initialRouteName="Initiate"
        >

            <HomeStackNavigator.Screen
                name="Initiate"
                component={InitiateScreen}
                options={{
                    title:"Inicio",
                }}
            />

            <HomeStackNavigator.Screen
                name="Login"
                component={LoginScreen}
            />

            <HomeStackNavigator.Screen
                name="Register"
                component={RegisterScreen}
            />

            <HomeStackNavigator.Screen
                name="Events"
                component={EventsScreen}
                options={{
                    title:"Events",
                }}
            />

            <HomeStackNavigator.Screen
                name="DetailsUser"
                component={DetailsUserScreen}
                options={{
                    title:"Details User",
                }}
            />

            <HomeStackNavigator.Screen
                name="DetailsEventNVScreen"
                component={DetailsEventNVScreen}
                options={{
                    title:"Details of event",
                }}
            />

            <HomeStackNavigator.Screen
                name="DetailsEventEScreen"
                component={DetailsEventEScreen}
                options={{
                    title:"Details of event",
                }}
            />

            <HomeStackNavigator.Screen
                name="CreateEvent"
                component={CreateEventScreen}
                options={{
                    title:"Create Event",
                }}
            />

            <HomeStackNavigator.Screen
                name="Tabs"
                component={MyTabs}
                options={{
                    headerBackTitleVisible: false,
                }}
            />
        </HomeStackNavigator.Navigator>
    )
}


const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                tabBarActiveTintColor: 'purple',
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Feed',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={30} />
                    ),
                    tabBarBadge: 10,
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    tabBarLabel: 'Settings',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="brightness-5" color={color} size={30} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

/*Returnamos un componenete de tabnavigation */
export default function Navigation() {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    );
}
