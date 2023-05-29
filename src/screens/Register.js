import React, { Component } from 'react'
import { Text, View } from 'react-native'
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
            
            </View>
        )
    }
}
export default Register
