import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import {auth, db} from '../firebase/config';


 class formRegister extends Component {
     constructor(props) {
         super(props)
         this.state = {
            inputMail : "",
            inputPassword : "",
            username: "",
            bio: "",
            foto: "",
            error: ""
         }

     }


     registrarUsuario(mail, password, username, bio, foto) {
        auth.createUserWithEmailAndPassword(mail, password)
        .then(res => 
            db.collection("users")
            .add({
                owner: mail,
                password: password,
                usuario: username,
                bio: bio,
                foto: foto,
            })
            .then(()=>{
                this.setState({
                    inputMail : "",
                    inputPassword : "",
                    username: "",
                    bio: "",
                    foto: "",
                })
                this.props.navigation.navigate('Login', {screen: 'Login'})
            })
            .catch((error) => console.log(error))
            
            
            
            )
        .catch(error => this.setState({
            error: `El error es: ${error.message}`
        }))
    }

 
    render() {
        return (

            <View>
                <Text>
                    {this.state.error}
                </Text>
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
                <TextInput 
                    style={styles.input}
                    placeholder = 'digita tu username'
                    onChangeText = {(text) => this.setState({username: text})}
                    value = {this.state.username}
                
                />
                <TextInput 
                    style={styles.input}
                    placeholder = 'digita tu bio'
                    onChangeText = {(text) => this.setState({bio: text})}
                    value = {this.state.bio}
                />
                <TextInput 
                    style={styles.input}
                    placeholder = 'agregar foto'
                    onChangeText = {(text) => this.setState({foto: text})}
                    value = {this.state.foto}
                />

                
                {
                    this.state.inputMail=="" || this.state.inputPassword == "" ||this.state.username =="" ?
                    <TouchableOpacity style = {styles.btnerror}>
                    <Text style = {styles.buttonText}> Registrarme</Text>
                  </TouchableOpacity>
                :
                <TouchableOpacity style = {styles.btn}onPress = {() => this.registrarUsuario(this.state.inputMail, this.state.inputPassword, this.state.username,this.state.bio, this.state.foto)}>
                    <Text style = {styles.btnText}> Registrarme</Text>
               </TouchableOpacity>
                }

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
        color: 'green'
    },
    buttonText : {
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'grey'
    }
})

export default formRegister
