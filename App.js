import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack'


const Stack = createNativeStackNavigator;

import Home from './src/screens/Home';
import Register from './src/screens/Register';


export default function App() {
  return (
    <View>
     
      <Home />
    </View>
  );
}



