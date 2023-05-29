import React, { Component } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import FormRegister from '../components/formRegister';

 class Register extends Component {
     constructor(props){
         super(props)
        
     }

    render() {
        return (
            <View>
                <Text> Aqui vamos a tener nuestro registro </Text>
                <FormRegister />
                <TouchableOpacity onPress = {() => this.props.navigation.navigate('HomeNav', {screen: 'Profile'})} >
                    <Text>Home</Text>
                </TouchableOpacity>
            
            </View>
        )
    }
}
export default Register
