import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../screens/Home'
import ProfileAmigo from '../screens/ProfileAmigo'
import Comments from '../screens/Comments'

const Stack = createNativeStackNavigator()

export default class FunctionalitiesNav extends Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name='Home'
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Comments'
          component={Comments}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='ProfileAmigo'
          component={ProfileAmigo}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    )
  }
}