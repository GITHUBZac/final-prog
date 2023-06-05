import React, { Component } from 'react'
import { Text, TouchableOpacity, View, StyleSheet, TextInput,  } from 'react-native'
import {auth, db} from '../firebase/config';
import MyCamera from '../components/MyCamera/MyCamera';
import newPost from './newPost';

 class Register extends Component {
     constructor(props){
         super(props)
         this.state = {
            inputMail : "",
            inputPassword : "",
            username: "",
            bio: "",
            foto: "",
            mostrarCamara: false,
            permisos: true,
            error: "",
          
         }

     }

     onImageUpload(url){
        this.setState({
            foto: url,
            mostrarCamara: false,
        })
    }

     

     componentDidMount(){ 
        auth.onAuthStateChanged(
        user => {
            if (user){
                this.props.navigation.navigate("HomeNav")
            }
        })
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
                createdAt: Date.now()
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
            <View style={styles.fondo}>
                    <Text>
                    {this.state.error}
                </Text>
                <TextInput 
                    style={styles.input}
                    placeholder = 'Digita tu E-Mail'
                    keyboardType = "email-address"
                    onChangeText = {(text) => this.setState({inputMail: text})}
                    value = {this.state.inputMail}
                />
                <TextInput 
                    style={styles.input}
                    placeholder = 'Digita tu Password'
                    onChangeText = {(text) => this.setState({inputPassword: text})}
                    value = {this.state.inputPassword}
                    secureTextEntry = {true}
                />
                <TextInput 
                    style={styles.input}
                    placeholder = 'Digita tu Username'
                    onChangeText = {(text) => this.setState({username: text})}
                    value = {this.state.username}
                
                />
                 <TextInput 
                    style={styles.input}
                    placeholder = 'Digita tu Biografía'
                    onChangeText = {(text) => this.setState({bio: text})}
                    value = {this.state.bio}
                />
                
                { this.state.mostrarCamara ?
                        <View style={{width: '100vw', heigth: '100vh'}}>
                            <MyCamera onImageUpload={url => this.onImageUpload(url)}/> 
                        </View> 
                        :
                        <TouchableOpacity style={styles.input} onPress={()=> this.setState({mostrarCamara:true})}>
                            <Text>Agrega tu foto de perfil </Text>
                        </TouchableOpacity>
                  }
                    
                

                {
                    this.state.inputMail=="" || this.state.inputPassword == "" ||this.state.username =="" ?
                    <TouchableOpacity style = {styles.btnerror}>
                    <Text style = {styles.buttonText}> Registrarme</Text>
                  </TouchableOpacity>
                :
                <TouchableOpacity style = {styles.btn}onPress = {() => this.registrarUsuario(this.state.inputMail, this.state.inputPassword, this.state.username,this.state.bio, this.state.foto, this.state.mostrarCamara=false)}>
                    <Text style = {styles.btnText}> Registrarme</Text>
               </TouchableOpacity>
                }


                <Text onPress={() => this.props.navigation.navigate('Login') }>Ir al Login</Text>
            </View>
        )
    }
    
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 5,
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
    },
    fondo : {
        color: '#033d03'
    }

})
export default Register
