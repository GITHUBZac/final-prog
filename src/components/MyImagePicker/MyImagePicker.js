import React, { Component } from 'react'
import { Text, View , TouchableOpacity, Image, StyleSheet} from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import {storage } from '../../firebase/config'

export default class MyImagePicker extends Component {
    constructor(props) {
        super(props)
        this.state = {
            imagenCargada: ''
        }
    }
    activarPicker() {
        ImagePicker.launchImageLibraryAsync()
        .then((imageData) => this.setState({imagenCargada: imageData.assets[0].uri}))
        .catch()
    }

    aceptarImagen(){
        fetch(this.state.imagenCargada)
        .then(resp => resp.blob())
        .then(imagen => {
            let ref = storage.ref(`imgPerfil/${Date.now()}.jpeg`)
            ref.put(imagen)
            .then(()=>{
                ref.getDownloadURL()
                .then(url => this.props.actualizarFotoPerfil(url))
            })
        })
        .catch(err => console.log(err))
    }

    rechazarImagen(){
        this.setState({imagenCargada: ''})
    }


    render() {
        return (
            <View >

                {
                    this.state.imagenCargada !== '' ?
                    <>
                        <Image 
                        source={{uri: this.state.imagenCargada}} 
                        style={styles.img}
                        resizeMode='cover'
                        />
                        <TouchableOpacity
                        style = {styles.input}
                        onPress={()=>this.aceptarImagen()}
                        >
                            <Text style={styles.btnText} >Aceptar Imagen</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        style = {styles.input}
                        onPress={()=> this.rechazarImagen()}>
                            <Text style = {styles.btnText}>Rechazar Imagen</Text>
                        </TouchableOpacity>

                    </>
                    :

                    <>
                    
                    <TouchableOpacity
                    onPress = {() => this.activarPicker()}
                    style = {styles.btn}
                    >
                   <Text style = {styles.btnText}>Cargar imagen de mi libreria</Text>

                    </TouchableOpacity>

                    </>

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
    },
    img: {
        height: 500,
        
    }
})
