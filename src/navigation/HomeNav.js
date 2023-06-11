import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AntDesign } from '@expo/vector-icons';

import Home from '../screens/Home';
import Profile from '../screens/Profile';
import NewPost from '../screens/NewPost';
import Buscador from '../screens/Buscador';


const Tab = createBottomTabNavigator();

export default class HomeNav extends Component {
    render() {
        return (
            <Tab.Navigator >
                <Tab.Screen name='Home' component={Home}
                    options={{ tabBarIcon: () => <AntDesign name='home' color='black' size={24} /> }} />

                <Tab.Screen
                    name='Search'
                    component={Buscador}
                    options={{
                        headerShown: false,
                        tabBarIcon: () => <FontAwesome name='search' size={24} color='grey' />

                    }}
                />

                <Tab.Screen name='NewPost' component={NewPost}
                    options={{ tabBarIcon: () => <AntDesign name="plus" color="black" size={24} /> }} />

                <Tab.Screen name='Profile' component={Profile}
                    options={{ tabBarIcon: () => <AntDesign name="profile" color="black" size={24} /> }} />



            </Tab.Navigator>



        )
    }
}
