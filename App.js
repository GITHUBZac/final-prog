import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Register from './src/screens/Register';
import HomeNav from './src/navigation/HomeNav';
import Login from './src/screens/Login';
import ProfileAmigo from './src/screens/ProfileAmigo';
import Profile from './src/screens/Profile';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
            <Stack.Screen name='Register' component = {Register} />
            <Stack.Screen name='Login' component = {Login} />
            <Stack.Screen name='HomeNav' component = {HomeNav} options={{headerShown: false}}/>
            <Stack.Screen name='Profile' component = {Profile} />
            <Stack.Screen name='ProfileAmigo' component = {ProfileAmigo} />
        </Stack.Navigator>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
});
