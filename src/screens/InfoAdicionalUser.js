import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import MyImagePicker from '../components/MyImagePicker/MyImagePicker'
import { db } from '../firebase/config'
export default class InfoAdicionalUser extends Component {
    constructor(props){
        super(props)
        this.state = {
            fotoDePerfil: '',
        }
    }

    actualizarEstadoFotoDePerfil(url){
        this.setState({fotoDePerfil: url})
    }

    actualizarDocDelUsuario() {
        console.log(this.props.route.params.docId)
        db.collection('users')
        .doc(this.props.route.params.docId)
        .update({
            fotoPerfil: this.state.fotoDePerfil
        })
        .then(resp => {
            this.props.navigation.navigate('HomeNav')
        })
    }

    render() {

        return (
            <View >
                
                <MyImagePicker actualizarFotoPerfil = {(url) => this.actualizarEstadoFotoDePerfil(url)} />

              {  
              this.state.fotoDePerfil !== '' ?

              <TouchableOpacity
              onPress = {() => this.actualizarDocDelUsuario()}
              style = {styles.input}
              >
                    <Text style = {styles.btnText}
                    >
                        Anadir foto de perfil
                    </Text>
                </TouchableOpacity>
                 : null

                }

                

            </View>
        )
    }
}
/*
<TouchableOpacity style = {styles.btn}>
                    <Text style = {styles.btnText}>
                        Omitir este paso
                    </Text>
                </TouchableOpacity>
                */


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
    btnText: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'green'
    },
    buttonText: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'grey'
    },
    login: {
        color: 'grey',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    contenedorLogin: {
        backgroundColor: 'black',
        width: 180,
        borderRadius: 10,
        height: 18
    }
})