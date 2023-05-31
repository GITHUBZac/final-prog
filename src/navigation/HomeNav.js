import React, { Component } from 'react'
import { Text, View } from 'react-native'

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {AntDesign} from '@expo/vector-icons';

import Home from '../screens/Home';
import Profile from '../screens/Profile';


const Tab = createBottomTabNavigator();

export default class HomeNav extends Component {
    render() {
        return (
            <Tab.Navigator >
                <Tab.Screen name = 'Home' component = {Home} 
                options = {{tabBarIcon: () => <AntDesign name = 'home' color = 'black' size = {24} /> }} />

                <Tab.Screen name = 'Profile' component = {Profile} 
                options = {{tabBarIcon: () => <AntDesign name = "profile" color = "black" size = {24} /> }} />
             

            </Tab.Navigator>
        )
    }
}
