import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import {auth} from '../firebase/config';


 class formRegister extends Component {
     constructor(props) {
         super(props)
         this.state = {
            inputMail : "",
            inputPassword : ""
         }

     }


     registrarUsuario(mail, password) {
        auth.createUserWithEmailAndPassword(mail, password)
        .then(data => console.log(data))
        .catch(err => console.log(err))
    }


    render() {
        return (

            <View>
                <TextInput 
                    style={styles.input}
                    placeholder = 'digita tu correo electronico'
                    keyboardType = "email-address"
                    onChangeText = {(text) => this.setState({inputMail: text})}
                    value = {this.state.inputMail}
                />

                <TextInput 
                    style={styles.input}
                    placeholder = 'digita tu password'
                    onChangeText = {(text) => this.setState({inputPassword: text})}
                    value = {this.state.inputPassword}
                    secureTextEntry = {true}
                />

                <TouchableOpacity
                style = {styles.btn}
                onPress = {() => this.registrarUsuario(this.state.inputMail, this.state.inputPassword)}
                >
                    <Text style = {styles.btnText}> Register my account</Text>
                </TouchableOpacity>

            </View>

        )
    }
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: '#3d3d3d',
        marginTop: 24,
        height: 24,
        padding: 5
    },
    btn: {
        backgroundColor: '#54d0e0',
        padding: 10,
        borderRadius: 20,
        marginTop: 32
    },
    btnText : {
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white'
    }
})

export default formRegister
